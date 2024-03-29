**Milestone #1 Drive Link:** https://docs.google.com/document/d/1D3Pj-m-k7gpKlDncpLtaw4JY0q4Ktgg-T6Pn0p3mmAE/edit?usp=sharing



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/mJCQDjDK)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13830037)

# Tech Stack
- **Next.js** app with mobile viewport
- **Django** **GraphQL** for backend
- **PostgreSQL** for DB

# Auth
1. `Login` component fetches a Json Web Token (JWT) at log in through `token_auth` mutation endpoint and saves the JWT as a cookie
2. `apolloClient` component sets JWT cookie as authorization header for grahql calls 
3. `ApolloProviderWrapper` component uses `ApolloProvider` with `apolloClient` as client to include auth JWT in graphql calls
4. Other pages can verify the JWT cookie at `verify_token` mutation endpoint to get username
5. User will be logged out due to token expiration since tokens are not refreshed--can be done with `refresh_token` mutation endoint
6. **Should secure endpoints to require login with `@login_required` decorator**
