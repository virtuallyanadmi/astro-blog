---
comments: true
date: '2010-07-19 21:26:00+00:00'
subheadline: VMware
image:
  thumb: vcenter41.png
teaser: "Ever leave for the weekend and come back Monday morning and can't access the virtual center through the vSphere client? Well that is exactly what happened this morning when I walked into work. So here is what to check."
title: Virtual Center not starting
categories: VMware
tags:
- vCenter
- vSphere
---

1. First you will have to logon to the esx(i) host that hosts the vCenter server.
2. Once you are in, then go into the vCenter using the console.
3. Once logged into the vCenter, go to Services.mmc.
4. Finally restart the VirtualCenter Server service.

That's it, then all you have to do to verify it, is attempt to go into the vCenter with the vSphere client again. It should pop up after loading everything.


Enjoy!
