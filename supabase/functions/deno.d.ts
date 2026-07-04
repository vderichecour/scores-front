// Ambient declaration so the editor's TypeScript server recognizes the Deno
// global used by Supabase Edge Functions. At runtime these functions execute
// on Deno, where the real APIs are provided.
declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    toObject(): Record<string, string>;
  };
  export function serve(
    handler: (request: Request) => Response | Promise<Response>,
  ): void;
}
