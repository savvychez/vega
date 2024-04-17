import { createClient } from "@/utils/supabase/client";
import { SelectOption } from "@/components/MultiSelect";
import { Database, Tables, Enums, } from '../database.types'
import { Availability } from "@/components/AvailabilityForm";

const supabase = createClient();

const getUserEmail = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (!data.session?.user.email || error) {
    console.error("ERROR!")
  }
  return data.session?.user.email
}

const getUserId = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (!data.session?.user.id || error) {
    console.error("ERROR!")
  }
  return data.session?.user.id
}

const getApplication = async (): Promise<Tables<'BusinessApplication'> | null> => {
  const email = await getUserEmail();

  const { data, error } = await supabase
    .from('BusinessApplication')
    .select('*')
    .eq("email", email)
    .limit(1)
    .returns<Tables<'BusinessApplication'>[]>();

  if (error) {
    console.error('Error retrieving application:', error.message);
    return null;
  }

  console.log("helloo!")
  return data[0]
}

const getBusinessID = async (): Promise<number | null> => {
  const id = await getUserId();

  const { data, error } = await supabase
    .from('Business')
    .select('business_id')
    .eq('owner_id', id)
    .limit(1);

  if (error) {
    console.error('Error retrieving business ID:', error.message);
    return null;
  }

  if (data && data.length === 1) {
    return data[0].business_id;
  }

  console.log('Business not found');
  return null;
};


export const addBusinessIfDoesntExist = async () => {
  const id = await getUserId();
  console.log("testing business creation")
  const { data, error } = await supabase
    .from('Business')
    .select('*')
    .eq("owner_id", id);

  if (error) {
    console.error('Error retrieving application:', error.message);
    return { error: error };
  }

  if (data && data.length >= 1) {
    console.log('Business application already exists');
    console.log(data)
    return { error: null };
  }

  const application = await getApplication();
  console.log("APLPLICATIPN");
  console.log(application)

  const { error: insertError } = await supabase
    .from('Business')
    .insert({ 
      application_id: application?.application_id, // Add null check
      email: application?.email, // Add null check
      owner_id: id
    });

  if (insertError) {
    console.error('Error adding business application:', insertError.message);
    return { error: insertError };
  }

  console.log('Business application added successfully');
  return { error: null };
};


export const getApplicationData = async () => {
  const email = await getUserEmail()

  const { data, error } = await supabase
    .from('BusinessApplication')
    .select('*')
    .eq("email", email)

  return data
}

export const updateApplicationData = async (data: Tables<'BusinessApplication'>) => {
  const email = await getUserEmail()

  const { error } = await supabase
    .from('BusinessApplication')
    .update(data)
    .eq("email", email)
  console.log("updated?")
  if (error) {
    console.error('Error updating application:', error.message);
    return { error: error };
  }
  return { error: null };

}


export const getBusinessServices = async (): Promise<Tables<'BusinessSpecificServices'>[] | null> => {
  const id = await getUserId()

  const { data, error } = await supabase
    .from('BusinessSpecificServices') // Replace with your table name
    .select("*")
    .eq('business_owner', id)
    .order('service_id', { ascending: true })

  if (error) {
    console.error('Error submitting application:', error.message);
  }
  

  return data;
};

export const insertService = async () => {
  const id = await getUserId()

  console.log("inserting service...")
  const { error } = await supabase
      .from('BusinessSpecificServices')
      .insert({
        "business_id": await getBusinessID(),
        "name": "",
        "business_owner": id,
      })
  console.log(error)
}

export const updateService = async (id: number, service: {name: string, duration: number, price: number}) => {
const { error } = await supabase
  .from('BusinessSpecificServices')
  .update({ ... service })
  .eq('service_id', id);

if (error) {
  console.error('Error updating service:', error.message);
  return { error: error };
}
return { error: null };
}

export const deleteService = async (id: number) => {
  const { error } = await supabase
    .from('BusinessSpecificServices')
    .delete()
    .eq('service_id', id);

  if (error) {
    console.error('Error deleting service:', error.message);
    return { error: error };
  }
  return { error: null };
}


export const addEmployee = async (first_name: string, last_name: string) => {
  const id = await getUserId()

  const { error } = await supabase
      .from('Employee')
      .insert({
        "business_id": await getBusinessID(),
        "first_name": first_name,
        "last_name": last_name,
        "business_owner": id,
      })
  console.log(error)
}

export const getBusinessEmployees = async () => {
  const id = await getUserId()

  const { data, error } = await supabase
    .from('Employee') 
    .select(`*,
            EmployeeServices (
              *,
              BusinessSpecificServices (
                service_id, name
              )
            )
              `)
    .eq('business_owner', id)

  if (error) {
    console.error('Error retrieving employees:', error.message);
  }
  return data;
};

export const updateEmployee = async (id: number, first_name: string, last_name: string, services: string[]) => {
  const { error } = await supabase
    .from('Employee')
    .update({ first_name, last_name })
    .eq('employee_id', id);

  // add services
  const businessOwner = await getUserId();

  const { error: serviceError } = await supabase
    .from('EmployeeServices')
    .delete()
    .eq('employee_id', id)

  console.log(serviceError)

  const business_id = await getBusinessID();

  if (services.length > 0) {
    const { error: insertError } = await supabase
      .from('EmployeeServices')
      .insert(services.map((service) => ({ employee_id: id, service_id: parseInt(service), business_owner: businessOwner, business_id: business_id })));

    if (insertError) {
      console.error('Error adding employee services:', insertError.message);
      return { error: insertError };
    }
  }

  if (error) {
    console.error('Error updating employee:', error.message);
    return { error: error };
  }
  return { error: null };
}


export const setBusinessAvailability = async (availabilities: Availability[]) => {
  const business_id = await getBusinessID()
  const business_owner = await getUserId()
  
  const { error: deleteError } = await supabase
    .from('BusinessSchedule')
    .delete()
    .eq('business_id', business_id);

  if (deleteError) {
    console.error('Error deleting availabilities:', deleteError.message);
    return { error: deleteError };
  }

  availabilities.forEach(async (availability) => {
    if (!availability.isOpen) {
      return;
    }
    const toInsert = {
      business_id: business_id,
      business_owner: business_owner,
      day: availability.index,
      start_time: availability.openingHour,
      end_time: availability.closingHour,
    };

    const { error } = await supabase
      .from('BusinessSchedule')
      .upsert(toInsert);

    if (error) {
      console.error('Error updating availability:', error.message);
      return { error: error };
    }
  });

  return { error: null };
}