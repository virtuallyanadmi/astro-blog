---
layout: page
title: "vSphere 6 ICM - Day 3"
date: "2015-11-04"
subheadline: Training Review
image:
  thumb: VMware-vSphere-6.jpg
  title: vmware_vsphere.png
meta_teaser: "Part 3 of my week of training for VMware vSphere 6 - Install, Configure, Manage course"
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

Finishing where we left off on Day 2 with Storage, Frank started the day talking about VMFS. He said to use it whenever possible. Also you can expand VMFS but not shrink it. To shrink it, you have to evacuate the datastore then delete and build out a new datastore. The maximum size for a VMFS datastore in vSphere 6 is 64TB. Two things you can do with VMFS datastores are unmounting and deleting them straight from the webclient.

In our first lab of the day, we renamed, created, expanded, removed, extended and then renamed the extended datastores available in the lab.

Next up, lecture on virtual SAN. Virtual SAN needs a dedicated network, a controller on each host in either passthrough or HBA mode, a flash drive (SSD) for cache and at least one other drive for storage. Not every node in the vSAN cluster needs local storage to participate. In my home lab, I am running a vSAN cluster with 128GB flash drives on the frontend and 500GB on the backend. Also, you have to have at least 3 hosts to run it with a maximum 64 hosts in the vSAN cluster. There are 4 tyupes of objects in a vSAN:

- Namespaces
- Virtual disks
- Snapshots
- Swap files

vSAN is controlled by storage policies. These aid in management by allow for automation as well as ease of management by meeting Service Level Agreements (SLAs). To manage vSAN with the webclient, go to the cluster and then settings under the manage tab. You have to enable vSAN as well as license it.

> One thing to note is if you are planning on removing a disk from a disk group, don't forget to evacuate the data<

When removing a host from a vSAN cluster, first place the host into maintenance mode, then delete the disk groups associated with the host, then remove the host from the cluster. We did not do a lab on vSAN which wasn't surprising as I believe we are running in a nested environment for the course.

Next up was a discussion on Virtual Volumes. Essentially with Virtual Volumes or as most people call them vVOLs, the vmdks and vmdk data operations are offloaded the host(s) and placed back on the array. To utilize vVOLs, the array must be able to run VMware APIs for Storage Awareness (VASA) version 2.0. It can be implemented on the array either by firmware, virtual appliance or by physical appliance. Frank didn't know of any physical appliances out there for vVOLs. To connect to vVOLs, the array has to push out an url and you add the storage just like you would a VMFS or NFS datastore. It is found in the add storage wizard.

![Virtual Volumes](/images/vvols.png)

vVOLs is also managed through storage policies and SLAs. If you notice a trend, that is because there is one. VMware is trying to make it easier to manage and automate the datacenter. Especially as it moves more towards a Software Defined Datacenter (SDDC).

That was the conclusion to the storage piece. In the afternoon we began the series on virtual machine management, which we didn't finish and will complete on day 4. First, Frank talked about templates. A template is a master copy of a virtual machine (vm) that is used to create and provision other vms.

Our first lab with VM management consisted of creating a template, creating custom specifications, then deploying a vm from the template. Then we also had another section on cloning a powered-on vm.

We had a brief discussion talking about hot-add cpu and memory. If you don't know what hot-add, let me explain. So when hot-add is enabled on a vm, you can add more CPU and memory to the vm on the fly. You do not need to power down the vm and then set the new configuration and the vm will automatically adjust. **A word of caution**, if your application is hard-code for multiple threads and you reduce the vm from 8 vCPU to 1 vCPU because vRealize Operations says that the vm is using less than 1, your application may break. Just saying... Then Frank talked about migrating vms. There are several types of migrations. They are cold (vm is powered off), suspended (vm is suspended), vMotion (vm can be on or off and is moved to another host), Storage vMotion (vm's data is migrated to another datastore) and Shared-Nothing migrations (migrate the vm without having a shared datastore between the source and destination vCenter).

*Another note on vMotions.* Maximum concurrent vMotions per VMFS datastore is 128. Also the maximum amount of vMotions on a 1GB network connection is 4 while a 10GB network connection will allow 8 concurrent vMotions. Here is the requirements and features for Cross vCenter vMotion (thanks [vSphereland](http://vsphere-land.com/news/summary-of-whats-new-in-vsphere-6.html)):

[![Cross vCenter vMotion](http://vsphere-land.com/wp-content/uploads/v6-new10.png)](http://vsphere-land.com/news/summary-of-whats-new-in-vsphere-6.html)

Frank talked about Enhance vMotion Compatibility (EVC) mode clusters. These are based on the physical CPU chipset and have to have Distributed Resource Scheduler (DRS) enabled on the cluster to function. An EVC cluster consists of hosts that have the same tupe of CPUs. For instance, you cannot have a cluster with AMD CPUs mixed in with Intel CPUs. Instead, you want to have AMDs with AMDs and Intel with Intel. Then there are various levels within those CPU sets that allow vSphere to be able to vMotion vms to other hosts even if they don't have the same generation of CPU. What happens is once the setting is set, all hosts present identical CPU features to vSphere and allow vMotions to occur.

So as you may have guessed, our lab consisted of migrating vms. From local datastore to shared datastore then after setting up a vMotion network between partner's hosts, we vMotioned vms between hosts and back again.

We finished off the day with Frank talking about snapshot management. He said that snapshots are not to be treated as backups nor kept long term. However, some backup products do use snapshots for use in there backup product. The reason you don't want to keep snapshots long term is that the delta files that are created when taking a snapshot can grow over time and consume the datastore. Frank talked about consolidating snapshots and finished the day making sure we finished the previous lab.

Day 4 we will start out on a lab and then delve into vApps and Content Libraries (something new in vSphere 6). Look for the next post to see my thoughts/round-up on it.
