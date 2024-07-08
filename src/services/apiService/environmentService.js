export class EnvironmentService {
  getBaseURL() {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
}
