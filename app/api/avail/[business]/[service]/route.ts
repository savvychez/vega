import { createClient } from "@supabase/supabase-js";
import { format } from 'date-fns';

function getTimeIntervals(day: number, month: number, year: number, startTime: string, endTime: string, interval: number) {
    const start = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${startTime}`);
    const end = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${endTime}`);
    const intervals = [];

  for (let current = start; current <= end; current.setMinutes(current.getMinutes() + interval)) {
    intervals.push(format(current, 'HH:mm:ss'));
  }
  const a = new Set(intervals);
  return new Set(intervals);
}

enum DaysOfWeek { Monday = 0, Tuesday = 1, Wednesday = 2, Thursday = 3, Friday = 4, Saturday = 5, Sunday = 6 }


export async function GET(request: Request, { params }: { params: { business: string, service: string } }) {
    // we will use params to access the data passed to the dynamic route
    const business = params.business;
    const service = params.service;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SERVICE_ROLE_KEY!);

    const { data, error } = await supabase
        .from('BusinessSchedule')
        .select('*')
        .eq("business_id", business)
        .limit(7)
        .order('day', { ascending: true });

    if (error) {
        console.error('Error fetching schedule:', error.message);
        return new Response(`business: ${business}\nservice: ${service}\nerror: ${error.message}`);
    }

    if (!data) {
        return new Response(`business: ${business}\nservice: ${service}\nerror: No data found`);
    }

    data.forEach((item: any) => {
        console.log(DaysOfWeek[item.day]);
        console.log("open: " +  item.start_time);
        console.log("close: " + item.end_time);
        const openIntervals = getTimeIntervals(1, 1, 2022, item.start_time.split("+")[0], item.end_time.split("+")[0], 30)
        
        openIntervals.forEach((interval: string) => {
            console.log(interval);
        })
    })
    
    return new Response(`business: ${business}\nservice: ${service}\ndata: ${JSON.stringify(data)}\nerror: ${error}`);
}
