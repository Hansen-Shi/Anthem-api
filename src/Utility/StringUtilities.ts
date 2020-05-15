export default class StringUtilities {
    public static generateRandomString(length: number) {
        let state = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            state += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return state;
    }
}
