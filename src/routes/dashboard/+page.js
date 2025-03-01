import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const ssr = false;

export function load() {
    if (browser && localStorage.getItem('boarded') === 'false') {
        throw redirect(307, '/dashboard/onboarding');
    }
}