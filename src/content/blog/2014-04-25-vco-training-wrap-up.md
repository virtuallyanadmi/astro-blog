---
comments: true
date: '2014-04-25 01:41:55+00:00'
subheadline: vCO Training
title: vCO training wrap-up
image:
  thumb: vco-142x150.png
teaser: "This is the third and final part in this series on the vCenter Orchestrator training."
categories: Training
tags:
- vCenter
- vCO
- VMware
---


You can find part 1 [here ](/Training/2014/04/21/day-1-vco-training/)and part 2 [here](/Training/2014/04/22/day-2-vco-training/).

So I finished the course yesterday but didn't bring about a blog entry as I wanted to spend some time away from computers last night.

Anyway, here is my wrap-up of the 3 day course.

Day 3 began with the instructor finishing up the lecture on the course. This included topics such as integrating vCenter Orchestrator, delivering workflows and a course summary.

I have to admit, it was a little difficult to listen the last hour or so as I was hungry and the instructor was trying to push through to finish the lecture so we could finish the labs which we had left. Day 3 had 7 labs left so we spent the afternoon doing labs until we finished the course.

The labs included gathering information on a VM, using ONYX, using the SOAP plugin, integrating Orchestrator with the Web Client, publishing reports to a web server, send reports through email, and using packages to bundle workflows.

ONYX is a cool tool that I hadn't used before. With it, you connect to your vCenter and then start recording on it. Any task that you do in vCenter will be recorded and then it will spit back out the changes into javascript so it can be used again. In the lab, we disabled HA host monitoring manually and then recorded it with ONYX and then copied the javascript output from ONYX into a workflow. Then ran the workflow and we were able to disable HA host monitoring via the workflow. Then we turned around and made another workflow which disabled a workflow and waited for input from user to re-enable HA host monitoring.

Being able to do reports and schedule them, which was another lab, will be helpful to those that support the systems that I design. Plus going through the labs on email should help us as well as we move forward with our internal private cloud offering.

Those were the main labs and overall I really enjoyed the class. I still think this course should be a 5 day course and delve deeper into what you can do with vCenter Orchestrator while also giving more breaks during the lecture time. You might ask if I would recommend this course and without a doubt, yes I do recommend this course if you plan on using vCenter Orchestrator. It is a tool that can make life easier not just for the operations staff but also for management as you can set up monthly reports, scheduled tasks and with it can automate just about anything as you can add plugins and even create plugins if need be.

I look forward to implementing it into our environment and being able to setup workflows that can be called from alarms, outside programs, or manual intervention.

If you haven't checked out vCenter Orchestrator, take a look by going to [here](http://www.vmware.com/products/vcenter-orchestrator). Feel free to leave comments about your experience with vCenter Orchestrator.
