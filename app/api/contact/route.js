import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email del propietario (tu cliente)
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'apartaruyen@gmail.com';

// Función para verificar reCAPTCHA
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    throw new Error('reCAPTCHA secret key not configured');
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const result = await response.json();
  return result;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, fechaLlegada, fechaSalida, huespedes, mensaje, recaptchaToken } = body;

    // Validar campos requeridos
    if (!nombre || !email || !fechaLlegada || !fechaSalida) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Verificar reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Token de verificación requerido' },
        { status: 400 }
      );
    }

    try {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.log('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
        return NextResponse.json(
          { error: 'Verificación de seguridad fallida. Por favor, intenta nuevamente.' },
          { status: 400 }
        );
      }

      // Verificar el score (reCAPTCHA v3 devuelve un score entre 0.0 y 1.0)
      if (recaptchaResult.score < 0.5) {
        console.log('reCAPTCHA score too low:', recaptchaResult.score);
        return NextResponse.json(
          { error: 'Verificación de seguridad fallida. Por favor, intenta nuevamente.' },
          { status: 400 }
        );
      }

      console.log('reCAPTCHA verified successfully. Score:', recaptchaResult.score);
    } catch (recaptchaError) {
      console.error('Error verifying reCAPTCHA:', recaptchaError);
      return NextResponse.json(
        { error: 'Error en la verificación de seguridad. Por favor, intenta nuevamente.' },
        { status: 500 }
      );
    }

    console.log('Enviando email al propietario:', OWNER_EMAIL);
    const emailToOwner = await resend.emails.send({
      from: 'noreply@aruyenaparthotel.com',
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `Nueva consulta de reserva - ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nueva Consulta de Reserva</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    
          <!-- Logo ARUYEN separado debajo -->
          <div style="text-align: center; margin-bottom: 20px;">
            <table style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: middle; text-align: right; padding-right: 15px;">
                  <!-- Usar imagen PNG del ícono en lugar de SVG -->
                  <img src="https://www.aruyenaparthotel.com/images/aruyen-icon.png" alt="ARUYEN" style="width: 32px; height: 32px; display: block; border: 0;" />
                </td>
                <td style="vertical-align: middle; text-align: left;">
                  <h2 style="margin: 0; font-size: 28px; color: #4a7c59; font-weight: bold; letter-spacing: 2px;">ARUYEN</h2>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #4a7c59; margin-bottom: 20px; border-bottom: 2px solid #4a7c59; padding-bottom: 10px;">
              Datos del Cliente
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59; width: 40%;">Nombre:</td>
                <td style="padding: 8px 0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59;"> Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
              ${telefono ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59;"> Teléfono:</td>
                <td style="padding: 8px 0;"><a href="tel:${telefono}" style="color: #0066cc; text-decoration: none;">${telefono}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59;"> Check-in:</td>
                <td style="padding: 8px 0;">${new Date(fechaLlegada).toLocaleDateString('es-AR')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59;"> Check-out:</td>
                <td style="padding: 8px 0;">${new Date(fechaSalida).toLocaleDateString('es-AR')}</td>
              </tr>
              ${huespedes ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a7c59;">Huéspedes:</td>
                <td style="padding: 8px 0;">${huespedes} personas</td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${mensaje ? `
          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #4a7c59; margin-top: 0;"> Mensaje del Cliente:</h3>
            <p style="margin: 0; color: #257b3f; font-style: italic;">"${mensaje}"</p>
          </div>
          ` : ''}

          
          
        </body>
        </html>
      `,
    });

    console.log('Email al propietario enviado con ID:', emailToOwner.id);

    console.log('Enviando confirmación al cliente:', email);
    // **EMAIL 2: Confirmación para el cliente**
    const emailToClient = await resend.emails.send({
      from: 'noreply@aruyenaparthotel.com',
      to: email,
      subject: '✅ Hemos recibido tu consulta - ARUYEN Apart Hotel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Consulta Recibida</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    
          <!-- Logo ARUYEN separado debajo -->
          <div style="text-align: center; margin-bottom: 20px;">
            <table style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: middle; text-align: right; padding-right: 15px;">
                  <!-- Usar imagen PNG del ícono en lugar de SVG -->
                  <img src="https://www.aruyenaparthotel.com/images/aruyen-icon.png" alt="ARUYEN" style="width: 32px; height: 32px; display: block; border: 0;" />
                </td>
                <td style="vertical-align: middle; text-align: left;">
                  <h2 style="margin: 0; font-size: 28px; color: #4a7c59; font-weight: bold; letter-spacing: 2px;">ARUYEN</h2>
                  <p style="margin: 0; font-size: 14px; color: #666;">Apart Hotel en Villa La Angostura</p>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="padding: 20px 0;">
            <h2 style="color: #4a7c59;">¡Hola ${nombre}! 👋</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              Gracias por tu interés en <strong>ARUYEN Apart Hotel</strong>. Hemos recibido tu consulta de reserva y nos pondremos en contacto contigo <strong>a la brevedad</strong> para confirmar la disponibilidad.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #4a7c59; margin-top: 0;"> Resumen de tu consulta:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px 0;"><strong> Llegada:</strong> ${new Date(fechaLlegada).toLocaleDateString('es-AR')}</li>
                <li style="padding: 5px 0;"><strong> Salida:</strong> ${new Date(fechaSalida).toLocaleDateString('es-AR')}</li>
                ${huespedes ? `<li style="padding: 5px 0;"><strong>Huéspedes:</strong> ${huespedes} personas</li>` : ''}
              </ul>
            </div>

            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; color: #155724; text-align: center;">
                <strong> Te contactaremos dentro de las próximas 24 horas</strong>
              </p>
            </div>
 
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Si tienes alguna pregunta urgente, no dudes en contactarnos directamente. +54 9 294 4969132
            </p>
          </div>

          
        </body>
        </html>
      `,
    });

    console.log('Email al cliente enviado con ID:', emailToClient.id);

    return NextResponse.json({
      success: true,
      message: 'Emails enviados correctamente',
      ownerEmailId: emailToOwner.id,
      clientEmailId: emailToClient.id,
    });

  } catch (error) {
    console.error('Error enviando emails:', error);
    return NextResponse.json(
      { error: 'Error al enviar el formulario. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}