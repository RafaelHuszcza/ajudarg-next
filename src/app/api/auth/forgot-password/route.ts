// import sgMail from '@sendgrid/mail'
import { createHash, randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (!existingUser) {
      return NextResponse.json(
        {
          message: 'Usuário não encontrado',
        },
        { status: 400 },
      )
    }

    const resetToken = randomBytes(20).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000
    const passwordResetToken = createHash('sha256')
      .update(resetToken)
      .digest('hex')
    existingUser.resetToken = passwordResetToken
    existingUser.resetTokenExpiry = new Date(resetTokenExpiry)

    // const resetUrl = `http://${process.env.NEXT_PUBLIC_URL}/auth/reset-password/${resetToken}`
    await prisma.user.update({
      where: {
        email,
      },
      data: existingUser,
    })
    return NextResponse.json({
      message: 'Serviço de email temporariamente desabilitado',
    })
    // return NextResponse.json({ message: resetUrl })
    // const body = `Reset sua senha clicando <a href="${resetUrl}">${resetUrl}</a>`
    // const msg = {
    //   to: email,
    //   from: 'rafaelhuszcza@gmail.com',
    //   subject: 'Reset de senha',
    //   text: body,
    // }

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // await sgMail
    //   .send(msg)
    //   .then(async () => {
    //     await prisma.user.update({
    //       where: {
    //         email,
    //       },
    //       data: existingUser,
    //     })
    //     return NextResponse.json({ message: 'Reset Password email is sent.' })
    //   })
    //   .catch(async (error) => {
    //     console.log(error)
    //     return NextResponse.json(
    //       {
    //         message: 'Erro Ao enviar email. Tente novamente',
    //       },
    //       { status: 400 },
    //     )
    //   })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
