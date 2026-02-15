---
layout: page
title: "Nested Challenges"
date: "2016-03-01"
comments: true
subheadline: Homelab
teaser: "Building up the homelab using nested ESXi hosts can be a challenge..."
image:
  thumb: lab.jpg
categories: Homelab
tags:
  - vSphere 6
  - esxi
  - microcode
  - home
  - lab
---
So thanks to [William Lam](http://www.virtuallyghetto.com/2015/12/deploying-nested-esxi-is-even-easier-now-with-the-esxi-virtual-appliance.html), I thought I would try to build out my homelab with the nested ESXi appliance. Things seemed to go smoothly as I was able to download the ova file and then import it into my vCenter. Then I turned it on...

Everything seemed good to go, the packages were loading and it was a breeze until this occurred [![Purple Screen](/images/microcode.PNG)](/images/microcode.PNG)

Needless to say, I spent some time querying my favorite search engine Google for the answers. After a little bit of data mining, I finally found this [Arima NM46X installing ESXi 'Unsupported microcode level 0x01000039'](http://serverfault.com/questions/502683/arima-nm46x-installing-esxi-unsupported-microcode-level-0x01000039) on serverfault.com. Essentially it said to add the `skipMicrocodeCompatCheck` attribute after pressing Shift+O on ESXi boot. This is what the line looks like before adding the attribute [![Shift+O](/images/esxiboot1.PNG)](/images/esxiboot1.PNG)

And this is what the line should be [![skipMicrocodeCompatCheck](/images/esxboot2.PNG)](/images/esxboot2.PNG)

To keep the setting so you don't have to press Shift+O every time the esxi host reboots, SSH into the box after it boots up and then run this command: `esxcfg-advcfg -k TRUE skipmicrocodecompatcheck`

So after completing this, I have 3 new nested hosts up and running in my home lab to play around with.
