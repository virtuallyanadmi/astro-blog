---
layout: page-fullwidth
title: vCenter 6 upgrade issues with Auto Deploy
date: '2016-07-21 20:05:29 -0500'
image:
  thumb: Autodeploy.jpg
subheadline: Auto Deploy
teaser: I ran into issues upgrading vCenter from 5.5 to 6 because of Auto Deploy. Here is how I fixed it....
category: vmware
tags:
  - vCenter Upgrades
  - vCenter 5.5
  - vCenter 6.0
  - Auto Deploy
---

We are in the middle of a big project at work where we will be upgrading and migrating our internal private cloud from one vBlock to a new vBlock. As part of this process. One of the tasks is to upgrade our vCenter that is connected to our vCloud Director from 5.5 to 6.0 Update 2\. First we upgraded the vCloud Director to a version that would support vSphere 6\. Then I had the task of upgrading the lab vCenter.

Since we were already running an external Single Sign On server, I upgraded it with no issues to the new external Platform Services Controller.

Next in line was the vCenter Server. We run a Windows-based vCenter (hopefully down the road we will migrate to the appliance). I started the installation. but after entering in the credentials for the administrator@vsphere.local and service account for the vCenter I received an error about Auto Deploy 5.1 being installed and the upgrade could not continue until either a compatible version was installed or it was uninstalled.

So, I logged in to the vCenter and found out that the Auto Deploy that was registered to the vCenter no longer existed and in our environment we are not running Auto Deploy anywhere at the moment. So I just couldn't log on to a server and run the following command to un-register Auto Deploy from the vCenter:

```
autodeploy-register -U -a ipaddress -u username -w password -p 80
```

So researching what to do, I came across a couple of blog entries from others. The first one was from [Christian Heim](http://christian.weblog.heimdaheim.de/2012/02/04/vmware-auto-deploy-already-registered-ruleengine/). In his post, he was able to show how to get the autodeploy-register.exe out of the setup. The second one was from [Joshua Andrews](http://sostechblog.com/2012/05/31/un-auto-deployed-ed/) which was able to show how to un-register Auto Deploy.

Needless to say, I ran the commands after extracting out the executable and voila, I was able to continue the upgrade.
