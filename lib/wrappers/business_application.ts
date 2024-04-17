import { createClient } from "@/utils/supabase/client";
import { SelectOption } from "@/components/MultiSelect";
import { Database, Tables, Enums,  }  from '../database.types'

const supabase = createClient();

export const getServices = async (): Promise<SelectOption[]> => {
    const { data, error } = await supabase
            .from('Services')
            .select()

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(item => ({
        value: item.name,
        label: item.label,
    }));
}

export const submitApplication = async (input: Tables<'BusinessApplication'>) => {
    const { error } = await supabase
      .from('BusinessApplication') // Replace with your table name
      .insert([input])

    
  
    if (error) {
      console.error('Error submitting application:', error.message);
      return { error: error };
    }

    return { data: input.url_token, error: null };
  };

export const checkApplicationSubmitted = async (email: string) => {
    const { data, error } = await supabase
      .from('BusinessApplication')
      .select('submitted')
      .eq('email', email);
  
    if (error) {
      console.error('Error fetching application:', error.message);
      return { error: error };
    }
    return data;
  }