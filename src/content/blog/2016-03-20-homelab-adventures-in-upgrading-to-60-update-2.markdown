---
layout: page-fullwidth
title: "Homelab adventures in upgrading to 6.0 Update 2"
date: "2016-03-20"
comments: true
subheadline: Homelab
teaser: "Upgrading difficulties in the homelab lead to a unique answer."
image:
  thumb: lab.jpg
categories: Homelab
tags:
  - vSphere 6
  - Update 2
  - esxi
  - upgrade
  - home
  - lab
  - esxcli
---
VMware released vSphere 6.0 Update 2 this past week and as one that likes to check out new technology, of course I wanted to update my homelab. Only problem was I had a host that was acting up. It ran fine and had VMs that ran fine on it but it would not update. First I tried to update through vCenter Update manager. It would attempt to install until about 99 percent then fail out.

First I tried to upgrade my host using `esxcli`. I turned off my firewall first with `esxcli network firewall ruleset set -e true -r httpClient` then ran this to upgrade to vSphere 6.0 Update 2:
{% highlight bash %}
esxcli software profile update -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.0.0-20160315001-standard
{%endhighlight %}
I ended up with this error:
{% highlight bash %}
 [NoMatchError]
 No image profile found with name 'ESXi-6.0.0-20160315001-standard'
         id = ESXi-6.0.0-20160315001-standard
 Please refer to the log file for more details.
 {%endhighlight %}

 So then I tried applying the profile by running the following:
 {% highlight bash %}
 esxcli software profile install -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.0.0-20160302001-standard
 {%endhighlight %}
 I was thinking I could just install the profile to the host. That didn't work either. I got the following error:
{% highlight bash %}
 [InstallationError]
 The installation transaction failed.
       vibs = No ImageProfile found for live image
 Please refer to the log file for more details.
 {%endhighlight %}

 So two strikes on getting this troublesome host updated. I tried several combinations until I finally ran this:
{% highlight bash %}
 [root@esx3:~] esxcli software vib list
 Name         Version             Vendor  Acceptance Level  Install Date
-----------  ------------------  ------  ----------------  ------------
tools-light  6.0.0-1.26.3380124  VMware  VMwareCertified   2016-01-16
{%endhighlight %}

Notice, it only showed one vib installed. So this is not looking very good. I am thinking at this point, I may have to just reinstall ESXi. I run this and it really makes me want to do more research.
{% highlight bash %}
[root@esx3:~] esxcli software profile get --rebooting-image
No pending image profile available.
   Name: No pending image profile available.
   Vendor: N/A
   Creation Time: 2016-03-20T21:55:39
   Modification Time: 2016-03-20T21:55:39
   Stateless Ready: True
   Description:



   VIBs:
 {%endhighlight %}

Then I checked the log by running this: `[root@esx3:~] cat /var/log/esxupdate.log`. It showed that I needed to get a host image profile installed. After doing some research, I finally got it to work by running this:
{% highlight bash %}
[root@esx3:~] esxcli software profile install -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.0.0-20160302001-standard --no-live-install --ok-to-remove
{%endhighlight %}
Which resulted in this:
{% highlight bash %}
Installation Result
   Message: The update completed successfully, but the system needs to be reboed for the changes to be effective.
   Reboot Required: true
   VIBs Installed: VMWARE_bootbank_mtip32xx-native_3.8.5-1vmw.600.0.0.2494585,Mware_bootbank_ata-pata-amd_0.3.10-3vmw.600.0.0.2494585, VMware_bootbank_ata-pa-atiixp_0.4.6-4vmw.600.0.0.2494585, VMware_bootbank_ata-pata-cmd64x_0.2.5-3vm600.0.0.2494585, VMware_bootbank_ata-pata-hpt3x2n_0.3.4-3vmw.600.0.0.2494585, ware_bootbank_ata-pata-pdc2027x_1.0-3vmw.600.0.0.2494585, VMware_bootbank_ata-ta-serverworks_0.4.3-3vmw.600.0.0.2494585, VMware_bootbank_ata-pata-sil680_0.4-3vmw.600.0.0.2494585, VMware_bootbank_ata-pata-via_0.3.3-2vmw.600.0.0.2494585VMware_bootbank_block-cciss_3.6.14-10vmw.600.0.0.2494585, VMware_bootbank_cpu-crocode_6.0.0-0.0.2494585, VMware_bootbank_ehci-ehci-hcd_1.0-3vmw.600.2.34.36259, VMware_bootbank_elxnet_10.2.309.6v-1vmw.600.0.0.2494585, VMware_bootbank_elex-esx-elxnetcli_10.2.309.6v-0.0.2494585, VMware_bootbank_esx-base_6.0.0-2.34620759, VMware_bootbank_esx-dvfilter-generic-fastpath_6.0.0-0.0.2494585, VMwarbootbank_esx-tboot_6.0.0-2.34.3620759, VMware_bootbank_esx-ui_1.0.0-3617585, Vare_bootbank_esx-xserver_6.0.0-0.0.2494585, VMware_bootbank_ima-qla4xxx_2.02.11vmw.600.0.0.2494585, VMware_bootbank_ipmi-ipmi-devintf_39.1-4vmw.600.0.0.24945, VMware_bootbank_ipmi-ipmi-msghandler_39.1-4vmw.600.0.0.2494585, VMware_bootnk_ipmi-ipmi-si-drv_39.1-4vmw.600.0.0.2494585, VMware_bootbank_lpfc_10.2.309.8vmw.600.0.0.2494585, VMware_bootbank_lsi-mr3_6.605.08.00-7vmw.600.1.17.3029758VMware_bootbank_lsi-msgpt3_06.255.12.00-8vmw.600.1.17.3029758, VMware_bootbanksu-hp-hpsa-plugin_1.0.0-1vmw.600.0.0.2494585, VMware_bootbank_lsu-lsi-lsi-mr3-ugin_1.0.0-2vmw.600.0.11.2809209, VMware_bootbank_lsu-lsi-lsi-msgpt3-plugin_1.0-1vmw.600.0.0.2494585, VMware_bootbank_lsu-lsi-megaraid-sas-plugin_1.0.0-2vmw00.0.11.2809209, VMware_bootbank_lsu-lsi-mpt2sas-plugin_1.0.0-4vmw.600.1.17.30758, VMware_bootbank_lsu-lsi-mptsas-plugin_1.0.0-1vmw.600.0.0.2494585, VMware_otbank_misc-cnic-register_1.78.75.v60.7-1vmw.600.0.0.2494585, VMware_bootbank_sc-drivers_6.0.0-2.34.3620759, VMware_bootbank_net-bnx2_2.2.4f.v60.10-1vmw.600.0.2494585, VMware_bootbank_net-bnx2x_1.78.80.v60.12-1vmw.600.0.0.2494585, VMwe_bootbank_net-cnic_1.78.76.v60.13-2vmw.600.0.0.2494585, VMware_bootbank_net-e00_8.0.3.1-5vmw.600.0.0.2494585, VMware_bootbank_net-e1000e_3.2.2.1-1vmw.600.16.3380124, VMware_bootbank_net-enic_2.1.2.38-2vmw.600.0.0.2494585, VMware_bootnk_net-forcedeth_0.61-2vmw.600.0.0.2494585, VMware_bootbank_net-igb_5.0.5.1.1-mw.600.0.0.2494585, VMware_bootbank_net-ixgbe_3.7.13.7.14iov-20vmw.600.0.0.24985, VMware_bootbank_net-mlx4-core_1.9.7.0-1vmw.600.0.0.2494585, VMware_bootbannet-mlx4-en_1.9.7.0-1vmw.600.0.0.2494585, VMware_bootbank_net-nx-nic_5.0.621-5w.600.0.0.2494585, VMware_bootbank_net-tg3_3.131d.v60.4-2vmw.600.1.26.3380124,Mware_bootbank_net-vmxnet3_1.1.3.0-3vmw.600.2.34.3620759, VMware_bootbank_nmlxcore_3.0.0.0-1vmw.600.0.0.2494585, VMware_bootbank_nmlx4-en_3.0.0.0-1vmw.600.0.2494585, VMware_bootbank_nmlx4-rdma_3.0.0.0-1vmw.600.0.0.2494585, VMware_bootnk_nvme_1.0e.0.35-1vmw.600.2.34.3620759, VMware_bootbank_ohci-usb-ohci_1.0-3vm600.0.0.2494585, VMware_bootbank_qlnativefc_2.0.12.0-5vmw.600.0.0.2494585, VMwe_bootbank_rste_2.0.2.0088-4vmw.600.0.0.2494585, VMware_bootbank_sata-ahci_3.02vmw.600.2.34.3620759, VMware_bootbank_sata-ata-piix_2.12-10vmw.600.0.0.249458 VMware_bootbank_sata-sata-nv_3.5-4vmw.600.0.0.2494585, VMware_bootbank_sata-sa-promise_2.12-3vmw.600.0.0.2494585, VMware_bootbank_sata-sata-sil24_1.1-1vmw.0.0.0.2494585, VMware_bootbank_sata-sata-sil_2.3-4vmw.600.0.0.2494585, VMware_otbank_sata-sata-svw_2.3-3vmw.600.0.0.2494585, VMware_bootbank_scsi-aacraid_1.5.1-9vmw.600.0.0.2494585, VMware_bootbank_scsi-adp94xx_1.0.8.12-6vmw.600.0.0.24585, VMware_bootbank_scsi-aic79xx_3.1-5vmw.600.0.0.2494585, VMware_bootbank_si-bnx2fc_1.78.78.v60.8-1vmw.600.0.0.2494585, VMware_bootbank_scsi-bnx2i_2.78.7v60.8-1vmw.600.0.11.2809209, VMware_bootbank_scsi-fnic_1.5.0.45-3vmw.600.0.0.24585, VMware_bootbank_scsi-hpsa_6.0.0.44-4vmw.600.0.0.2494585, VMware_bootbankcsi-ips_7.12.05-4vmw.600.0.0.2494585, VMware_bootbank_scsi-megaraid-mbox_2.20.1-6vmw.600.0.0.2494585, VMware_bootbank_scsi-megaraid-sas_6.603.55.00-2vmw.600.0.2494585, VMware_bootbank_scsi-megaraid2_2.00.4-9vmw.600.0.0.2494585, VMwareootbank_scsi-mpt2sas_19.00.00.00-1vmw.600.0.0.2494585, VMware_bootbank_scsi-mpas_4.23.01.00-9vmw.600.0.0.2494585, VMware_bootbank_scsi-mptspi_4.23.01.00-9vm600.0.0.2494585, VMware_bootbank_scsi-qla4xxx_5.01.03.2-7vmw.600.0.0.2494585, ware_bootbank_uhci-usb-uhci_1.0-3vmw.600.0.0.2494585, VMware_bootbank_vsan_6.0-2.34.3563498, VMware_bootbank_vsanhealth_6.0.0-3000000.3.0.2.34.3544323, VMwa_bootbank_xhci-xhci_1.0-3vmw.600.2.34.3620759, VMware_locker_tools-light_6.0.0.34.3620759
   VIBs Removed:
   VIBs Skipped:
{%endhighlight %}

I rebooted my host and after it rebooted, my host was updated to vSphere 6.0 Update 2 and I finished getting my homelab upgraded. It took some time to research my options but in the end, I was able to avoid building it from scratch and was able to use esxcli.
