---
title: "Powershell Credentials"
subheadline: "Scripting Aids"
date: '2015-05-13 20:14:50 -0500'
meta_teaser: "If you use more than one vCenter, connecting to multiple vCenters is easy with a credential file."
teaser: "If you connect to a lot of vCenters in different domains with different credentials, this helpful tip can help you."
image:
    thumb: powershell.png
    title: what-is-powershell.png
comments: true
categories: Powershell
tags:

  - PowerCLI
  - vCenter
  - Scripting
---
At work, I transitioned back to the Internal Cloud team almost a month ago. Since then, I have been focusing on scripting. In fact, about 90% of the work I have done has been scripting, primarily Powershell scripts. The scripts I have focused on have been scripts that can be handed off to operations' teams whether it is the Internal Cloud Ops team or one of the other Ops team that exists at my company.
<!--more-->
So I have built out a form framework that uses the .Net Windows.Systems.Forms coding to give a form to use against one of our 9 vCenters. I will go into more details on it in future blog posts but what I wanted to highlight in this one is the PowerCLI cmdlet  `Get-VICredentialStoreItem`.

`Get-VICredentialStoreItem` is a great way to store credentials for vCenters. I found out about by reading an [article](http://tech.zsoldier.com/2011/09/save-powercli-login-credentials-to-xml.html) by [@Zsoldier](http://twitter.com/Zsoldier) that outlined how to use it a couple of years ago and have used it since.

With as many vCenters that we have and could add to down the road, I keep a CSV with vCenters/vCloud Director and Environment that they are in. It looks similar to this:

{% highlight text %}
Environment,Servers
Prod,vCenter1
Prod,vCenter2
Prod,vCenter3
Dev,DevvCenter1
Dev,DevvCenter2
Dev,DevvCenter3
VCD,vcdurl.local
VCD,devvcdurl.local
{% endhighlight %}

With having so many different vCenters, I use the `$CSV = Import-CSV "Servers.csv"` command in most of my scripts. Then I can just use  `$CSV.Environment`  or  `$CSV.Servers` to call either the environment or the vCenter. Also, for scripts where I need to hit multiple vCenters like reports, I can run a  `foreach ($server in $CSV.Servers) {whatever action I want to commit to all the servers}`.

So today, I recreated my credential file. Since the  `Get-VICredentialStoreItem` uses encryption that is tied to both the user and computer and so it can't be moved from one computer to another. We use jumpboxes in both our development and production environments. I wanted to be able to scripts where I don't have to keep inserting my credentials everytime and  `Get-VICredentialStoreItem` does that.

Without further ado, here is the script I created that essentially created the xml file in seconds:

{% highlight PowerShell %}
#### I add this in my VMware scripts so the VMware CMDLETs are available
if ( (Get-PSSnapin -Name VMware.VimAutomation.Core -ErrorAction SilentlyContinue) -eq $null )
{
Add-PSsnapin VMware.VimAutomation.Core
}
$CSV = Import-CSV "Servers.csv"
foreach ($server in $($CSV | where {$_.Environment -eq "Prod"}).Servers) {
  New-VICredentialStoreItem -Host $server -User "my Prod username" -Password "my Prod password" -File "filename.xml" #This will create the xml file for each server that the environment is labeled Prod
}
foreach ($server in $($CSV | where {$_.Environment -eq "Dev"}).Servers) {
  New-VICredentialStoreItem -Host $server -User "my Dev username" -Password "my Dev password" -File "filename.xml" #Notice same file name as this will keep the credentials in one file that can be called later
}
foreach ($server in $($CSV | where {$_.Environment -eq "VCD"}).Servers) {
  New-VICredentialStoreItem -Host $server -User "my VCD username" -Password "my Prod password" -File "filename.xml" #Again same filename to keep all credentials in one location
}
{% endhighlight %}

Now I have a credential file that contains all of my credentials in one file that can be used. To use it, do something like this:

{% highlight Powershell %}
if ( (Get-PSSnapin -Name VMware.VimAutomation.Core -ErrorAction SilentlyContinue) -eq $null )
{
Add-PSsnapin VMware.VimAutomation.Core
}
$CSV = Import-CSV "Servers.csv"
foreach ($server in $CSV.Servers) {
  $creds = Get-VICredentialStoreItem -File "filename.xml" -Host $server
  Connect-VIServer $creds.Host -User $creds.User -Password $creds.Password
  Do actions and functions
}
Disconnect-VIServer * -Force -ErrorAction SilentlyContinue -Confirm:$false
{% endhighlight %}

Now I can copy this to the different jumpboxes and run it to store my credentials in multiple places. Enjoy this if you want.
