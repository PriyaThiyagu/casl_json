import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/database';

@Module({
    imports:[PrismaModule]
})
export class AbilityModule {}
