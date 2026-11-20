<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Share inquiry validation and persistence between the interactive server function and the public form endpoint so submissions still work when browser scripts do not load.
- Keep admin-only inquiry retries behind authenticated server functions with a server-validated role check; never trust browser role state for delivery operations.
- Keep replacement data access in server-only Turso helpers and enforce admin authorization server-side from the configured sign-in provider; retain the existing backend until migration verification passes.
