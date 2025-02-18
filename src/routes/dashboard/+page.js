import { redirect } from '@sveltejs/kit';
import Cookies from 'js-cookie';
import axios from 'axios';

export function load({ parent }) {
    return parent().then(({ user }) => {
        if (!user) throw redirect(307, '/login');
    });
}