// import { NextFunction, Response } from "express";
import { NextFunction, Response, Request } from "express";
import { client } from "../../../loaders/mongoose";
import puppeteer from "puppeteer";

class ChatController2 {

    //get initial chats
    async getChats(req: Request, res: Response, next: NextFunction){
        try{
            // let offset: any = req.query?.offset;
            const rid: any = req.query.rid;
            const sid: string = req.user._id;
            const page_size: number = 50;
            // get chats from
            const query: string = `select * from messages where ((rid='${rid}' and sid = '${sid}') or (rid='${sid}' and sid = '${rid}')) and created_at < now() order by created_at desc limit ${page_size}`;
            const response: any = await client.query(query);
            if(response.rows.length > 0){
                response.rows.reverse();
            }
            res.status(200).json({ data: response.rows.length > 0 ? response.rows : []});
        }catch(error){
            throw(error);
        }
    }

    // load jobs

    async getJobs(req: Request, res: Response, next: NextFunction){
        try{
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto('https://internshala.com/jobs');
            const jobs = await page.evaluate(() => {
              const jobList: any = [];
              document.querySelectorAll('.internship_meta').forEach((job: any) => {
                const title: any = job.querySelector('.profile')?.innerText ?? 'N/A';
                const company_name: any = job.querySelector('.company_name')?.innerText ?? 'N/A';
                const location: any = job.querySelector('.location_link')?.innerText ?? 'N/A';
                const ctc: any = job.querySelector('.salary')?.innerText ?? 'N/A';
                const start_date: any = job.querySelector('#start-date-first')?.innerText ?? 'N/A';
                const posted_time: any = job.querySelector('.tags_container_outer .status')?.innerText ?? 'N/A';
                const experience: any = job.querySelector('.job-experience-item .desktop-text')?.innerText ?? 'N/A';
                const logo_url: any = job.querySelector('.internship_logo img')?.src ?? 'N/A';
                jobList.push({ title, company_name, location, ctc, start_date, experience, posted_time, logo_url });
              });
              return jobList;
            });
            await browser.close();
            jobs.shift();
            return res.status(200).json({ data: jobs });
        }catch(error){
            throw(error);
        }
    }
}

export default ChatController2;
