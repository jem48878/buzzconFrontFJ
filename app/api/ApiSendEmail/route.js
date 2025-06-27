export async function POST(request) {
  const { to_name, message, reply_to } = await request.json();

  const payload = {
    service_id: 'service_uhiry3n',
    template_id: 'template_luyvw0n',
    user_id: 'Cr46Wdhz3tydtaB4W', // Public Key
    accessToken: 'AyDkJ9TABhu4GVoiSzyEO', // Private Key
    template_params: {
      to_name,
      message,
      reply_to,
    },
  };

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
