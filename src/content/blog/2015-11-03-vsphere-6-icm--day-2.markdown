---
layout: page
title: "vSphere 6 ICM - Day 2"
date: "2015-11-03"
subheadline: Training Review
image:
  thumb: VMware-vSphere-6.jpg
  title: vmware_vsphere.png
meta_teaser: "Part 2 of my week of training for VMware vSphere 6 - Install, Configure, Manage course"
teaser: "It's been 7 years since I went to a Install, Configure, Manage course. This is my take on it."
comments: true
categories: Training
tags:
  - Training
  - VMware
  - New Horizons
  - ICM
  - Install, Configure, Manage
---

This is a series on some training I have done. Here are the links in the series:

- [Part 1](/training/2015/11/02/vsphere-6-icm--day-1/)
- [Part 2](/training/2015/11/03/vsphere-6-icm--day-2/)
- [Part 3](/training/2015/11/04/vsphere-6-icm--day-3/)

So yesterday was all about the basics, today the class was broken into 3 subjects, folders, networking and storage.

VMware has had folders for virtual machines in their past versions. I had used them for virtual machines. Now they are available for Hosts and Clusters, Network and Storage. With folders you can add permissions to them rather than giving permission to individual components in the folders. So say I want to give the Storage Admins access to a certain set of datastores or even ESXi hosts. Put the hosts or datastores in a folder and then give it permissions for access and viola the Storage Admins have access. As part of the labs, we created a training folder and moved our ESXi hosts into them. It would have been nice to go the next step and give the folder permissions as well.

Next up was networking. Our instructor, Frank, started by talking about standard switches and broke down the networking piece in a very thorough way. In fact, at the end of the lecture, he asked if there were any questions which there wasn't and he said something to the effect either we didn't know what to ask or didn't want to ask or he had done such a good job of explaining it, that there was no need to have any questions. He said he would take the last of the three choices. Lab time brought about us building out a standard switch and port group and adding the virtual machine we had built the previous day to the switch. Then we ran the `ipconfig /release` then `ipcondig /renew` commands to get a new IP address and then pinged the gateway to verify it worked.

Then it was on to Distributed switches. There was a small discussion on the Nexus 1000v. We currently have it in most of our virtual machine farms. However, most of the engineers present stated that they wished it would be removed. Yes it does work, however they called out that we have run into multiple issues with it and even found some bugs for Cisco in it. Personally, I feel it is not worth the pain to have in place. There was a good comparison chart that our instructor brought up here it is:
![Standard vs Distributed Switch vs Cisco 1Kv](/images/switches.png)

One thing to note on networking, standard switches only allow Cisco Discovery Protocol (CDP) while distributed switches allow both CDP and Link Layer Discovery Protocol (LLDP). My two cents on switches in a vSphere environment is to setup the distrubuted switch. It allows you to be able to manage just one switch rather than making sure that all the switches in your environment is correct. For instance, say you want to add a new VLAN into your environment. With standard switches, you will have to touch each and every standard switch on each ESXi host. Whereas, with distributed switches, you make the change once and it pushes out the changes to all of the ESXi hosts. Easier management by far!

We then setup a distrubuted switch and migrated both the host and the virtual machine to the distributed switch. One thing that was interesting to me was that at the end of the lab, we were asked to move the virtual machine back to the standard switch for future lab work. We'll see what happens with that.

Finally, we were instructed on storage and the different storage protocols that vSphere offers. Frank talked about iSCSI, NAS's, NFS, VMFS (only version 5 as most people have migrated to it), vSAN, vVOLs and RDMs. Virtual Volumes is a new technology for VMware and more information can be found here. vSAN is a technology that uses local storage on the ESXi host to create a datastore. SSDs are required to run it as is at least 3 hosts. I have it setup in my lab environment at home and I can say it does very well. The SSDs provide a cache like atmosphere in front of the spinning disks. The only issue I have run into is when I have to reboot my host(s), it can take a while for the reboot as it goes through and does a check on the datastore. When you have 3 hosts and patch them for maintenance, it can be somewhat a pain to have the hosts take extra long for each host. But other than this inconvenience, I really love vSAN. Frank also talked about RDMs and he said that they are primarily used in SQL servers or in instances where someone is needing to convert from physical to virtual and have a large data disk.

We did an iSCSI lab where we went through and added a software iSCSI adapter, then connected it to an iSCSI device. It brought over some datastores which meant we were successful.

We finished the day talking about NFS and comparing the two different versions that vSphere 6 supports, 3 and 4.1. As of right now, it is still recommended to use version 3 if you use Storage DRS, Storage I/O Control, Site Recovery Manager or Virtual Volumes. Here is the comparison chart.
![NFS comparison](http://m.c.lnkd.licdn.com/mpr/mpr/AAEAAQAAAAAAAAKbAAAAJGI2YWFjN2QzLWIwOGUtNDJjMS04YWJiLTdmY2U0Yjg5YmM4MQ.jpg)

We added an NFS datastore for the last lab of the day and will continue on storage and other stuff in tomorrow's session. Tune in here to get the round-up.
