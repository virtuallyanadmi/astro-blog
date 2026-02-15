---
comments: true
date: '2014-04-15 01:38:44+00:00'
subheadline: PowerCLI
title: My foray into PowerCLI via PowerPath
image:
  thumb: powershell.png
teaser: "Here is my first go at writing an entry on PowerShell. I have been using it for several years to help automate wherever I am at."
categories: PowerShell
tags:
- EMC
- PowerCLI
- PowerPath
- PowerShell
- reporting
- scripting
- VMware
---

Today, I was asked to figure out what level of PowerPath we were at on our hosts. So I did some data mining (aka Googling) and found some PowerCli scripts to help out. Here is the script I came up with to print out to a report on our hosts and what level of PowerPath they are at:

{% highlight Powershell %}
#This checks to make sure that the VMware PSSnapin is installed and if not, installs it
if ( (Get-PSSnapin -Name VMware.VimAutomation.Core -ErrorAction SilentlyContinue) -eq $null )
{
Add-PSsnapin VMware.VimAutomation.Core
}

#This lists out the different vCenters that will be connected to (can enter as many as wish as long as there is credentials in the store
$viservers = <enter your vcenters here>

#Turn the csv into a string to store for later
$csv = "vmhostplugininfo_$(get-date -format MMddyyyy).csv"

$myCol = @()
#Now for the report
foreach ($singleViserver in $viservers)
{
#First we grab the credentials from the credential file
$cred = Get-VICredentialStoreItem -host $singleViserver -File "cred.xml"

#Now we connect to each of the vCenters using the credentials
Connect-VIServer $singleViserver -user $cred.User -Password $cred.Password

#And now we gather the information for each host
ForEach ($vmhost in Get-VMHost) {
    $Esxcli = Get-EsxCli -VMHost $vmhost
    $VMView = $VMhost | Get-View
        $VMSummary = "" | Select vCenter, HostName, Version, PluginName, PluginVersion
        $VMSummary.vCenter = $singleViserver
        $VMSummary.HostName = $VMhost.Name
        $VMSummary.Version = $VMView.Config.Product.FullName
#Now to check whether the host is a version 4 or 5 and the corresponding get values for the plugin(s)
        If($VMSummary.Version -like "*4.*"){
        $VMSummary.PluginName = Get-VMHostPatch -VMHost $vmhost | ?{$_.Description -like "PowerPath*"}.ID
        $VMSummary.PluginVersion = Get-VMHostPatch -VMHost $vmhost | ?{$_.Description -like "PowerPath*"}.Description}
        Else{
        $VMSummary.PluginName = [string]::Join(',',(($esxcli.software.vib.list() | ?{$_.Name -like "powerpath*"}).ID))
        $VMSummary.PluginVersion = [string]::Join(',',(($Esxcli.software.vib.list() | ?{$_.Name -like "powerpath*"}).Version))}
        $myCol += $VMSummary
                    }
}

#We clean up by disconnecting from the vCenters
Disconnect-VIServer * -Confirm:$false
#Finish by exporting out the file into a csv
$myCol | Export-Csv $csv -NoTypeInformation -UseCulture
{%endhighlight %}
Now let's go into some of the detail of the script. The first section is:

```
if ( (Get-PSSnapin -Name VMware.VimAutomation.Core -ErrorAction SilentlyContinue) -eq $null )
{
Add-PSsnapin VMware.VimAutomation.Core
}
```

I have been using this script to pull in the VMware PowerShell snapin automatically if is isn't loaded. If PowerCLI hasn't been loaded on the machine you attempt to run this script, click [here ](https://my.vmware.com/web/vmware/details?downloadGroup=PCLI550R2&productId=353)to download it. This is the latest version as of this writing.

Next is:

```
$viservers = <enter your vcenters here>
```

We have more than one vCenter in our environment so you can have a couple of options. I just list mine out like "vCenter1", "vCenter2", "vCenter3". If you want you can also pull from a CSV with the following code:

```
$viservers = Import-CSV
```

Next line is:

```
$csv = "vmhostplugininfo_$(get-date -format MMddyyyy).csv"
```

This line is used to create the csv file that the report will be saved to. I put in the get-date -format MMddyyyy to get the current date with the format MonthDayYear (example 04142014). The next part of the code is:

```
$myCol = @()
```

This starts the report array. Let's move now into the report. The next line is:

```
foreach ($singleViserver in $viservers)
{
```

This starts a foreach statement, which loops through all the servers listed in the $viservers array. The next line, I grab credentials from an encrypted xml file.

```
$cred = Get-VICredentialStoreItem -host $singleViserver -File "cred.xml"
```

I really like the Get-VICredentialStoreItem command. If you are not familiar with it, check out [Chris Nakagaki's](http://about.me/zsoldier) article on it [here](http://tech.zsoldier.com/2011/09/save-powercli-login-credentials-to-xml.html). Now to connect to the vCenter with the credentials.

```
Connect-VIServer $singleViserver -user $cred.User -Password $cred.Password
```

The $singleViserver is the vCenter while the User and Password properties come from the credentials file. Of course you have to load them up into the file before running the script or you will have errors. Now that you are connected to the vCenter, let's pull some data:

{%highlight PowerShell%}
ForEach ($vmhost in Get-VMHost) {
$Esxcli = Get-EsxCli -VMHost $vmhost
$VMView = $VMhost | Get-View
$ID = ($Esxcli.software.vib.list() | ?{$_.Name -like "powerpath*"}).ID
$Version = ($Esxcli.software.vib.list() | ?{$_.Name -like "powerpath_"}).Version
$VMSummary = “” | Select vCenter, HostName, Version, PluginName, PluginVersion
$VMSummary.vCenter = $singleViserver
$VMSummary.HostName = $VMhost.Name
$VMSummary.Version = $VMView.Config.Product.FullName

# Now to check whether the host is a version 4 or 5 and the corresponding get values for the plugin(s)

If($VMSummary.Version -like "_4._"){
$VMSummary.PluginName = Get-VMHostPatch -VMHost $vmhost | ?{$_.Description -like "PowerPath_"}.ID
$VMSummary.PluginVersion = Get-VMHostPatch -VMHost $vmhost | ?{$_.Description -like "PowerPath*"}.Description}
Else{
$VMSummary.PluginName = [string]::Join(',',($ID))
$VMSummary.PluginVersion = [string]::Join(',',($Version))}
$myCol += $VMSummary
}
}
{%endhighlight %}

The code goes through each host ```ForEach ($vmhost in Get-VMHost) {``` and grabs the information for this part of the code. ```$VMSummary = “” | Select vCenter, HostName, Version, PluginName, PluginVersion```
Then it grabs the vCenter, Hostname, Host ESXi Version, and the PowerPath plugin info (PluginName and PluginVersion). I put in an if/else part to grab the PluginName for ESXi version 4 ```Get-VMHostPatch -VMHost $vmhost | ?{$_.Description -like "PowerPath*"}.ID``` Because it doesn't work for ESXi version 5. So I used the ESXCLI command to pull the information for the version 5 level to do it. ```($Esxcli.software.vib.list() | ?{$_.Name -like "powerpath*"}).ID``` Then I put in a Join with a comma separation as there were multiple results in the vib list. The last line ```$myCol += $VMSummary``` puts all the information into the $myCol array. Then we continue with this line:

```
Disconnect-VIServer * -Confirm:$false
```

This disconnects all the connections to the different vCenters. And finally the last line takes the array and exports it out to the csv file we created earlier: ```$myCol | Export-Csv $csv -NoTypeInformation -UseCulture```

That is the script I created to grab the PowerPath versions from our vCenters. I would like to hear any comments or questions about it.

Here is a link to the powershell script. [PowerPathInfo.ps1]({{ root url }}/assets/ps/PowerPathInfo.ps1)
