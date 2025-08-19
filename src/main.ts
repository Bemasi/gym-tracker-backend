import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
console.log('[main] bootstrapping');
const app = await NestFactory.create(AppModule);


app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


const config = new DocumentBuilder()
.setTitle('Gym Tracker API')
.setDescription('API for tracking workouts')
.setVersion('1.0.0')
.addBearerAuth()
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`[main] listening on http://localhost:${port}`);
}


bootstrap();