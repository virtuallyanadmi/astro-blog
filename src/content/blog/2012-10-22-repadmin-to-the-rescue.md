---
comments: true
date: '2012-10-22 00:52:30+00:00'
slug: repadmin-to-the-rescue
title: Repadmin to the rescue
image:
  thumb: gotcha.jpg
subheadline: Disaster Recovery
teaser: "Ran into some gotchas doing DR...."
categories: VMware
tags:
- Disaster Recovery
- DR
- NetApp
- Repadmin
- Snap
---

So at work we tested a disaster recovery (DR) plan this past weekend. I wanted to share some gotchas that we ran into. The test was a "poor man's" DR test. We currently are utilizing [NetApp's snap technology](http://communities.vmware.com/blogs/nickhowell/2010/03/31/netapp-snap-what-does-it-all-mean) to backup from our production data center to our backup center. Our DR test consisted of restoring some of our production to an isolated network in our backup center. Since we had the backup snaps in our backup center, we used [flexclone](http://www.netapp.com/us/products/platform-os/flexclone.html) to restore from the original VMs. We used a single ESXi host with a backup SQL server that was mirrored from production.<!-- more -->

Our first gotcha was that when we set up the host to host the VMs we were going to use for the test, we had forgotten to change in the BIOS the Enable VT. So we ran into the following error when we powered up our 64-bit VMs.

![Description: VM error](/images/vm-error.png)

Also, we ran into an issue where the Windows servers were stuck in a boot loop. So after shutting down all the VMs, we changed the BIOS entry, powered up the VMs and continued on our journey in the DR test.

The second gotcha came with the domain controllers (DCs). Since we were going to restore into an isolated network that had minimum outside connection, we had to make sure that the backup center did not talk to our production. Without talking to our domains, when we brought up the root domain PDC and child domain PDC from restored snaps,  they tried to communicate with the other domain controllers on our production network, which did not happen. First it had issues logging in after powering up the PDC. Finally, we figured out that we had to use the domain administrator account, this got us logged in to the PDC. But services were not starting. What to do? What to do? After a little bit of googling, this is what we did. First we ran the following command ```repadmin /options <domain controller name> +DISABLE_OUTBOUND_REPL``` and then ```repadmin /options <domain controller name> +DISABLE_INBOUND_REPL``` on each DC. What this did was stop replication issues that were occurring because of the isolated network issue.

Once the domains were up, we broke the SQL mirror and started up our web servers. We changed the IP for the SQL connection to point the alias to the backup SQL server. We restarted IIS on the web servers and voila, our software as a service (SaaS) application was in business. Sure there were some minor issues within the application that we will work out but overall we called this test a success.
