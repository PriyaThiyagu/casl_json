import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../src/user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/abilities.guard';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [UsersModule, AbilityModule,
    RoleModule,
    PermissionModule,
    PostModule,
  ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:AbilitiesGuard
  }
  ],
})
export class AppModule {}
