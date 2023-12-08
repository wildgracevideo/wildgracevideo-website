import { type RecaptchaType } from '~/types/form-requests';

const MIN_SCORE = 0.4;

export async function validateRecaptcha(
    recaptchaSecret: string,
    token: string,
    action: RecaptchaType
) {
    try {
        const response = await (
            await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: recaptchaSecret,
                    response: token,
                }),
            })
        ).json();
        console.log(response);
        if (response.score < MIN_SCORE) {
            console.error(`Recaptcha score too low, ${response.score}`);
        }
        return (
            response.success &&
            response.action === action.valueOf() &&
            response.score >= MIN_SCORE
        );
    } catch (error) {
        console.error(error);
        return false;
    }
}
