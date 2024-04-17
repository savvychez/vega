import Link from "next/link";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function Register({
    searchParams,
}: {
    searchParams: { message: string, token: string, name: string };
}) {
    const getEmailFromToken = async (): Promise<string | null> => {
        "use server"
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SERVICE_ROLE_KEY!);

        const { data, error } = await supabase
    .rpc('get_email_by_token', { "token": searchParams?.token})
        
        if (error) {
            console.error('Error fetching email:', error);
            return redirect("/register?message=Couldn't find an email with this invite...");
        }
        return data;
    }

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SERVICE_ROLE_KEY!);
        if (!searchParams.token ) {
            return redirect("/register?message=Invalid Link! Please use the link provided in your email");
        }

        const real_email = await getEmailFromToken()

        if (!real_email) {
            return redirect("/register?message=Couldn't find an email with this invite...");
        }

        const { error } = await supabase.auth.signUp({
            email: real_email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
                data: {
                    token: searchParams.token,
                    first_name: firstName,
                    last_name: lastName,
                    business: true
                }
            },
        });

        if (error) {
            console.log(error)
            return redirect("/register?message=Couldn't register! Try again later :(");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <div className="bg-white px-8 py-8">
                <form
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                    action={signUp}
                >
                    <h1 className="mb-10 text-4xl font-light">get <span className="font-semibold">{searchParams?.name}</span> on vega</h1>
                    {/* <label className="text-md font-semibold" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 border mb-6 focus:outline-red-700 bg-white/75"
                        name="email"
                        placeholder="you@example.com"
                        required
                    /> */}
                    <label className="text-md font-semibold" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="rounded-md px-4 py-2 border mb-6 focus:outline-red-700 bg-white/75"
                        name="firstName"
                        placeholder="Your first name"
                        required
                    />
                    <label className="text-md font-semibold" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="rounded-md px-4 py-2 border mb-6 focus:outline-red-700 bg-white/75"
                        name="lastName"
                        placeholder="Your last name"
                        required
                    />
                    <label className="text-md font-semibold" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-white/75 bg-inherit border mb-6 focus:outline-red-700 "
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <button
                        formAction={signUp}
                        className="border rounded-md px-4 py-2 bg-red-700 text-zinc-50 hover:bg-red-800 transition-all mb-2"
                    >
                        Get started!
                    </button>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
