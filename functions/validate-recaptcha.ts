export async function validateRecaptcha(recaptchaSecret: string, token: string, action: string) {
  const data = JSON.stringify({
    secret: recaptchaSecret,
    response: token,
  });
  try {
    const response = await (await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })).json();
    return response.success && response.action === action && response.score >= 0.4;
  } catch (error) {
    console.error(error);
    return false;
  }
}
