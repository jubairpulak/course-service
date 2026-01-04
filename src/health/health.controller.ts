import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: 'Auth service health check',
    schema: {
      example: {
        status: 'ok',
        service: 'employee-service',
        timestamp: '2025-12-31T04:55:00.000Z',
        name:"jubair "
      },
    },
  })
  health() {
    return {
      status: 'ok',
      service: 'employee-service',
      timestamp: new Date().toISOString(),
      name:"jubair "
    };
  }
}
