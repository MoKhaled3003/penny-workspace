import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { BlacklistedToken } from './auth/blacklisted-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Database host
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Replace with your PostgreSQL username
      password: 'postgres', // Replace with your PostgreSQL password
      database: 'auth_db', // Replace with your PostgreSQL database name
      entities: [User, BlacklistedToken], // Specify entities for the database
      synchronize: true, // Set to true for development, false for production
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
