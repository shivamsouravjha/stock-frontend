import React from "react";
import { Heading} from "@chakra-ui/react";

function SLA() {
    return(
        <>
            <Heading size='2xl'>Service Level Agreement</Heading>
            <div style={{padding:'30px'}}>
            CloudFLy SLA effective: 20th November 2022 <br/>
            Cloudfly provides a 99.99% uptime commitment for Cloudfly customers’ use of Cloudfly (our service level agreement or SLA). 
            If we fall short of our 99.99% uptime commitment and your data share is affected, we’ll apply a service credit to your account for future use. 
            For clarity, in the event of any downtime of Cloudfly, a Cloudfly customer shall receive service credits for Cloudfly only pursuant 
            to this SLA and will not receive any service credits for downtime of a non-Cloudfly service.
            </div>
            <Heading size='ml'>Downtime</Heading>
            <div style={{padding:'30px'}}>
            Downtime is the overall number of minutes Cloudfly was unavailable during a Cloudfly fiscal quarter (i.e., 1 February to 30 April and every three-month period thereafter). Cloudfly calculates unavailability using server monitoring software to measure the server side error rate, ping test results, web server tests,  TCP port tests and website tests.
            Downtime excludes the following:
            <ul style={{paddingLeft:'40px'}}>
                <li> Slowness in accessing(view/download) the image(because of huge size)</li>
                <li> Issues that are related to external apps or third parties, including addblockers</li>
                <li> External network or equipment problems outside of our reasonable control, such as bad routing tables between your internet service provider (ISP) and our server </li>
                <li> Access through a IP blocked due to security concerns </li>
                <li> Scheduled downtime for maintenance</li>
            </ul>
            </div>
            <Heading size='ml'>Uptime commitment</Heading>
            <div style={{padding:'30px'}}>
            Uptime is the percentage of total possible minutes CloudFLy was available during a fiscal quarter. Our commitment is to maintain at least 99.99% uptime:
            <br/>
            <b>[(total minutes in quarter - downtime) / total minutes in quarter] &gt;=99.99% </b>
            </div>
            <Heading size='ml'>Scheduled downtime</Heading>
            <div style={{padding:'30px'}}>
            <p>Sometimes we need to perform maintenance to keep CloudFly working smoothly. If scheduled downtime is necessary, we’ll give you at least 48 hours’ advance notice. In a year, scheduled downtime won’t exceed 10 hours.</p>
            </div>
            <Heading size='ml'>Service credit</Heading>
            <div style={{padding:'30px'}}>
            <p>If we fall short of our uptime commitment, we’ll add credit to each affected account equal to 2 times of their current tier space
                Active during the period cloudfly was down (we call this service credit).
                Service credit is not a refund, cannot be exchanged into a cash amount,
                is capped at a maximum of 30 days of service,
                requires you to have paid any outstanding invoices and expires upon
                termination of your customer contract.
                Service credit is the sole and exclusive remedy
                for any failure by CloudFly to meet its obligations
                under this SLA. Note, downtime doesn’t affect 
                everyone at the same time or in the same way.
                For example, some accounts may receive service credit
                during an outage in their region, while other accounts in other regions that have not been similarly affected will not.</p>
            </div>        
        </> 
    );
}

export default SLA;
