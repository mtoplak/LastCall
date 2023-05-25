import { Injectable } from '@nestjs/common';
import {
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import stream = require('stream');
import fastify = require('fastify');
import * as util from 'util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

