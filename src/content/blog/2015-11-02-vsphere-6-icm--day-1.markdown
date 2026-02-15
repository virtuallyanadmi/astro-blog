---
layout: page
title: "vSphere 6 ICM - Day 1"
date: "2015-11-02"
subheadline: Training Review
image:
  thumb: VMware-vSphere-6.jpg
  title: vmware_vsphere.png
meta_teaser: "Part 1 of my week of training for VMware vSphere 6 - Install, Configure, Manage course"
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

*First, I want to apologize as this may be long. But I wanted to be thorough in my covering of the training class.*

So my company has brought in [New Horizons](http://www.newhorizons.com/) to give us training on vSphere 6. They chose the [Install, Configure, Manage](https://mylearn.vmware.com/mgrreg/courses.cfm?ui=www_edu&a=one&id_subject=60901) course as we have multiple departments participating in the training, everything from Networking to Linux to Storage to the Internal Cloud team that I am on are participating in the course.

Heading up this training is none other than [Frank Berardi](http://vsandbox.com/about/leadership-team/) aka "Frank the tank" from [vSandbox](http://vsandbox.com), a training company out of Florida.

We started the training session like most, with introductions. Frank added a twist, asking the students for the latest movie that they watched. Then after the introductions, he said that he did that to get suggestions for movies as he is on the road a lot and has time to burn, both at the hotel as well as on flights, etc. He likes to get the opinions of the students as he said most critics get it wrong. When the general populace like something, the critics give a movie a bad rating and when the critics give a movie a good rating, the general populace generally don't like it. At least that is his opinion of it. So he likes to see what the students have seen and asked several students their opinion of the movie if it intrigued him. By the way, for the record, the last movie I watched was [Avengers, Age of Ultron](http://www.imdb.com/title/tt2395427/).![Avengers, Age of Ultron](http://onesmallwindow.com/wp-content/uploads/2015/04/h_mr_avengers2.jpg)

Then the lecture began. Since we had several people who had not dealt or had very little contact with VMware products, the lecture started with the basics. I think this is good for a Install, Configure, Manage course as most people who are taking this course are trying to learn how to navigate the world of virtualization. However, for those of us who have been in the virtual realm for years, I can say it was difficult for me to pay attention. I want to thank Frank though as he was able to bring me back into the realm by delving deep into the inner workings of ESXi and this intrigued me as sometimes you forget some of the deeper inner-workings. For instance, when he was talking about virtual machines, he went through each part/file of a virtual machine. I know this pretty well and started checking out the latests tweets but then he brought me back in by talking about the vmdk files and why in some windows you can only see one and in others you can see both the flat vmdk and the pointer vmdk. He said that at one time, VMware administrators would look for ways to save storage space and they would find the flat vmdk which was bigger than the pointer vmdk and they would delete it, thinking they could save space. This would backfire on them as they were deleting the data that they needed to run the VM.

After going over the basics, we began setting up our lab environments for the week. This first lab was essentially setting up the vSphere client by RDPing into the vSandbox environment and then again into the lab environment. The environment is nested which is perfect for a training environment. For those of you who don't understand what nested is, let me break it down for you. Essentially a nested environment is where you virtualize the hypervisor level, in this case the ESXi servers are virtual machines. What this allows is to have an environment that can be replicated very quickly and other benefits like being able to move the environment. So after installing the client, we connected to the ESXi host.

The second lab was building out a virtual machine on that host. In our case, it was a 32-bit 2008 Windows Server. I had done this many times as I have a home lab so the lab went smoothly.
![Windows 2008 setup](http://d300o12yzguyet.cloudfront.net/wp-content/uploads/2012/12/VMRegion2.png)

More lecture followed about vCenter and it's components. This part of the lecture kept me more intrigued as vSphere 6 introduces some new concepts, such as the [Platform Services Controller](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2113115) (PSC). As you can see from the KB in that link, there are changes in 6.0 over 5.5 but some things remain. For instance, the multi-master model for the Single Sign-On that was introduced in vSphere 5.5 remains. Also to note, the vCenter appliance in vSphere 6.0 equals what the Windows version offers without having to pay for the Microsoft license and the SQL license. The appliance runs an embedded database (vPostgres) or one can connect the appliance to an external Oracle database. However, if you are planning on running more than 8 hosts, you will want to have an external PSC. The PSC can be setup different ways, and Frank explained the various ways it could be setup. He also talked about the ways not to set it up.

Then we delved into the final couple of labs. This third lab was about setting up the vCenter. We were told to work with our partner (which we had been assigned to earlier in the day) and setup vCenter. First things first, we had to install the Client Integration Plugin for Firefox. This is easy to do as you just connect to the vCenter website and the download link shows up at the bottom of the page if it is not installed already. Download and install the plugin and you are good to go. Then we logged into the vCenter via the web client and added a license for it, for the ESXi servers and started some of the configuration. The fourth lab of the day played off of the third lab as we added our ESXi host assigned to us and licensed it. Pretty simple stuff but still relevant to what the class is.

Now that our environment is up and going, I expect tomorrow to be more in-depth on vSphere 6 and I think it will be good even for those of us who have already been using the product for a while. So tune in hopefully tomorrow to see [part 2](http://virtuallyanadmin.com/training/2015/11/03/vsphere-6-icm--day-2/) of this series.
