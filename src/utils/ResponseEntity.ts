export class ResponseEntity {
  constructor(
    private success: boolean,
    private message: string,
    private data?: object,
  ) {}
}
