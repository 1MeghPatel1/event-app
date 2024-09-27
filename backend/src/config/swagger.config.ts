import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Chat-Bot API')
  .setDescription(
    'This is the Chat-Bot API, you can create messages, get messages and add options to it.',
  )
  .setVersion('1.0')
  .build();
