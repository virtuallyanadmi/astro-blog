---
layout: page
title: "Upgrading Home Lab"
date: 2015-06-04 22:00:00 -0500
comments: true
subheadline: Homelab
teaser: "Time to upgrade the homelab..."
image:
  thumb: lab.jpg
categories: Homelab
tags:
  - vSphere 6
  - esxi
  - fdm
  - home
  - lab

---
I have a [VMUG Advantage]("http://www.vmug.com/Advantage") account and this week they announced that they now offer vSphere 6. So I decided I was going to upgrade my home lab. My home lab consists of an old Dell DSC6005 with 3 nodes with the older AMD CPU. Even though it is older, it has 48GB of RAM in each node and with the VMUG Advantage licenses, I can run a pretty good home lab.

First I upgraded my vSphere VCSA (Virtual Center Server Appliance). The installation was different and I had to use one of my test vms with Windows to upgrade. I run Ubuntu on my laptop but have eval versions of Windows 10 and Windows Server in my lab to test things out.

The downloads from VMUG Advantage were a VCSA iso, a VIM iso and a vSphere client iso. With the upgrade, I followed the directions and downloaded the isos, mounted the VCSA one first. I ran the Client Plugin executable and then opened the vcsa-setup.html. From here, I clicked on the Upgrade button and followed the directions. I had to include a temporary IP and the ESXi host user (root) and password for the ESXi host that housed vCenter. I also had to include a username and password for vCenter. Fortunately, I didn’t run into any issues with it and soon I was up and going. In all it took a couple of hours (at most) to complete this install.

So next up was VMware Update Manager (VUM). I am running VUM on a Windows VM and mounted the VIM iso. I ran the install and it upgraded the SQL Express version I have with SQL 2012, which was nice, and upgraded my database to version 6. This took a couple of hours as the upgrade of SQL took about an hour for some reason.

Next up, the ESXi hosts. I have 3 hosts. This is where I ran into issues. I downloaded the iso from Dell for vSphere 6 and created an update baseline from the iso in VUM. I ran attached the baseline and put the host in maintenance mode and then attempted to remediate. I got an error that stated ```Cannot run upgrade script on host```. I googled around and eventually found Nizam Mohamed’s [article]("http://t.co/Ga9HOKPHyX") on running into this issue with previous versions of ESXi.

Here is what I did:

1. Disabled HA on the Cluster.
2. Put the host into maintenance mode.
3. Disconnected the host from the cluster.
4. SSH’d into the host.
5. Uninstalled the FDM Adapter:
    ```cp /opt/vmware/uninstallers/VMware-fdm-uninstall.sh /tmp```
    ```chmod +x /tmp/VMware-fdm-uninstall.sh```
    ```/tmp/VMware-fdm-uninstall.sh```
6. Rebooted host.
7. Reconnected host to Cluster.
8. Click on remediate to apply the upgrade to vSphere 6.

I did steps 2-8 for each host and viola, vSphere 6. So thanks [Nizam]("https://www.twitter.com/NizMoTek") for the help!
