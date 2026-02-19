import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email del propietario (tu cliente)
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'apartaruyen@gmail.com';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, fechaLlegada, fechaSalida, huespedes, mensaje } = body;

    // Validar campos requeridos
    if (!nombre || !email || !fechaLlegada || !fechaSalida) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    console.log('Enviando email al propietario:', OWNER_EMAIL);
    const emailToOwner = await resend.emails.send({
      from: 'noreply@aruyenaparthotel.com',
      to: OWNER_EMAIL,
      subject: `🏠 Nueva consulta de reserva - ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nueva Consulta de Reserva</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a2f3a 0%, #2d4a57 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px;">🏠 ARUYEN Apart Hotel</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Nueva Consulta de Reserva</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1a2f3a; margin-bottom: 20px; border-bottom: 2px solid #1a2f3a; padding-bottom: 10px;">
              📋 Datos del Cliente
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a; width: 40%;">👤 Nombre:</td>
                <td style="padding: 8px 0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a;">📧 Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
              ${telefono ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a;">📱 Teléfono:</td>
                <td style="padding: 8px 0;"><a href="tel:${telefono}" style="color: #0066cc; text-decoration: none;">${telefono}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a;">📅 Check-in:</td>
                <td style="padding: 8px 0;">${new Date(fechaLlegada).toLocaleDateString('es-AR')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a;">📅 Check-out:</td>
                <td style="padding: 8px 0;">${new Date(fechaSalida).toLocaleDateString('es-AR')}</td>
              </tr>
              ${huespedes ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1a2f3a;">👥 Huéspedes:</td>
                <td style="padding: 8px 0;">${huespedes} personas</td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${mensaje ? `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #856404; margin-top: 0;">💬 Mensaje del Cliente:</h3>
            <p style="margin: 0; color: #856404; font-style: italic;">"${mensaje}"</p>
          </div>
          ` : ''}

          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; text-align: center;">
            <p style="margin: 0; color: #155724; font-weight: bold;">
              ⚡ Responde rápidamente para asegurar la reserva
            </p>
            <p style="margin: 5px 0 0; color: #155724; font-size: 14px;">
              Contacta al cliente lo antes posible para confirmar disponibilidad y precio.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Este email fue generado automáticamente desde tu sitio web ARUYEN Apart Hotel</p>
          </div>
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
          <div style="background: linear-gradient(135deg, #1a2f3a 0%, #2d4a57 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px;">🏠 ARUYEN Apart Hotel</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Villa La Angostura</p>
          </div>
          
          <div style="padding: 20px 0;">
            <h2 style="color: #1a2f3a;">¡Hola ${nombre}! 👋</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              Gracias por tu interés en <strong>ARUYEN Apart Hotel</strong>. Hemos recibido tu consulta de reserva y nos pondremos en contacto contigo <strong>a la brevedad</strong> para confirmar la disponibilidad.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #1a2f3a; margin-top: 0;">📋 Resumen de tu consulta:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px 0;"><strong>📅 Llegada:</strong> ${new Date(fechaLlegada).toLocaleDateString('es-AR')}</li>
                <li style="padding: 5px 0;"><strong>📅 Salida:</strong> ${new Date(fechaSalida).toLocaleDateString('es-AR')}</li>
                ${huespedes ? `<li style="padding: 5px 0;"><strong>👥 Huéspedes:</strong> ${huespedes} personas</li>` : ''}
              </ul>
            </div>

            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; color: #155724; text-align: center;">
                <strong>⏰ Te contactaremos dentro de las próximas 24 horas</strong>
              </p>
            </div>

            <p>Mientras tanto, puedes seguirnos en nuestras redes sociales para ver más fotos y novedades de nuestras cabañas.</p>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Si tienes alguna pregunta urgente, no dudes en contactarnos directamente.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #1a2f3a; font-size: 18px; margin-bottom: 5px;"><strong>🏔️ ¡Te esperamos en Villa La Angostura! 🏔️</strong></p>
            <p style="color: #666; font-size: 14px;">ARUYEN Apart Hotel - Donde la naturaleza se encuentra con el confort</p>
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