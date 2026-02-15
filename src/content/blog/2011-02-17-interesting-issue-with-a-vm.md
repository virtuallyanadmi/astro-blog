---
comments: true
date: '2011-02-17 20:08:00+00:00'
subheadline: VMware
image:
  thumb: Windows7OnVM2.png
teaser: "An interesting dilemna..."
title: Interesting issue with a VM
categories: VMware
tags:
- IPSEC
- VM
- VMware
- vSphere
---

Came across an interesting dilemna this morning in our environment. A virtual machine (VM) had no connectivity.
After googling various items in regards to loss of connectivity for network in a virtual environment, I finally came across an answer in the VMware community ([link](http://communities.vmware.com/thread/41017)).
Basically, what we had to do to get it working was disable IPSEC. Because we are on a closed environment, this was possible to do. Once it was disabled, we rebooted the machine and viola, connectivity.
