export async function validateRecaptcha(recaptchaSecret: string, token: string, action: string) {
  try {
    const response = await (await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: token,
      })
    })).json();
    console.log(response);
    return response.success && response.action === action && response.score >= 0.4;
  } catch (error) {
    console.error(error);
    return false;
  }
}
