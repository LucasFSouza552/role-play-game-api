
export function getCookieValue(name) {
    try {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        
        const targetCookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
        
        if (!targetCookie) {
            console.debug(`Cookie "${name}" not found`);
            return null;
        }

        const cookieValue = targetCookie.split('=')[1];
        
        const [token, expiryStr] = cookieValue.split('|');
        
        if (!token || !expiryStr) {
            console.debug(`Invalid cookie format for "${name}"`);
            return null;
        }

        const expiry = parseInt(expiryStr, 10);
        
        if (isNaN(expiry)) {
            console.debug(`Invalid expiry timestamp for cookie "${name}"`);
            return null;
        }

        if (Date.now() > expiry) {
            console.debug(`Cookie "${name}" has expired`);
            return null;
        }

        return token;
    } catch (error) {
        console.error(`Error retrieving cookie "${name}":`, error);
        return null;
    }
}

export function setCookieValue(name, value) {
    try {
        const expiry = Date.now() + (24 * 60 * 60 * 1000);
        
        const cookieValue = `${value}|${expiry}`;
        
        document.cookie = `${name}=${cookieValue}; expires=${new Date(expiry).toUTCString()}; path=/; SameSite=Strict`;
        
        console.log(`Cookie "${name}" set successfully`);
    } catch (error) {
        console.error(`Error setting cookie "${name}":`, error);
    }
}