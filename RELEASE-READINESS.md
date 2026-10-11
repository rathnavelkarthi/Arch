# Illamora — release preparation

Audit date: 23 September 2026. Working brand: **Illamora**, “Find your place. Feel at home.” Name, trademark and domain availability are not yet cleared. This is an implementation plan and audit, not a release certification.

## Verified access and current state

| Service | Evidence | Next action |
| --- | --- | --- |
| Supabase account | Owner selected `taogivwsjnbtubblcjcc`; current CLI login does not list this project | Authenticate CLI with the owning account before migrations/deployments |
| Supabase app integration | Public configuration saved; auth health/settings return HTTP 200 | Implement migrations/storage/RLS and perform end-to-end tests |
| Environment | Ignored `.env.local` now contains the selected project URL and publishable key only | Evolution server configuration remains missing |
| Evolution / WhatsApp | No endpoint, instance or key found in app | Supply endpoint, instance, API version and configure server secrets |
| Google sign-in | Browser OAuth implemented; live settings report Google provider disabled | Enable Google in Supabase, configure OAuth redirects, then test on Android |
| Expo | EAS project ID `7fa3766c-0e15-4adc-b69c-02d402953ec0`; build profiles exist | Confirm owner access, signing and build configuration |
| Play Console | No access verified | Sign in personally and identify developer account and app |
| Authentication | Email/password login, signup, session restoration, route protection and sign-out now call Supabase; demo bypass removed | Verify against selected project; add WhatsApp verification/recovery |
| Data | Screens contain hardcoded sample content | Replace with database queries and truthful loading, empty and error states |

Read-only checks against `https://taogivwsjnbtubblcjcc.supabase.co` confirm auth health/settings HTTP 200, email enabled, signups allowed and email confirmation required. Google is disabled. Zero-row probes for `properties` and `architect_profiles` return HTTP 404 / PGRST205 (table absent from exposed schema cache). The REST schema root requires a secret key and rejects the publishable key; that restriction is not an outage. No accounts were created or messages sent. The service-role key shared in chat was not saved or embedded; it must be revoked/rotated by the owner. Ruflo tools requested by AGENTS.md are not available in this session's callable tool inventory.

## What the owner needs to configure

1. **Supabase:** choose/create the app's project. From Project Settings / API, copy its URL and publishable key into `.env.local` using `.env.example`. A legacy anon key can serve as the public client key if that is what the project supplies. Keep the service-role key on the server only. Never include it in `EXPO_PUBLIC_*` variables.
2. **Google:** sign into Google Cloud Console yourself. Configure the OAuth consent screen and a web OAuth client for Supabase's browser OAuth flow. Enter the client ID and secret in Supabase Authentication / Providers / Google. Use the callback URL displayed by Supabase as Google's authorized redirect URI. Configure the app's final callback scheme/HTTPS URL in Supabase's redirect allowlist. Do not send Google passwords.
3. **Evolution:** provide the HTTPS base URL, API version, instance name and whether the instance uses WhatsApp Business Cloud or a linked-device integration. Configure the API key in server secrets following `.env.server.example`. A read-only connection-state request should precede an explicitly requested test message. No messages were sent during this audit.
4. **Expo:** sign into EAS locally, confirm this project belongs to the intended account, and select the final Android application ID. The existing ID is `com.rathnavelkarthi.temp_app`; changing it after publication creates a different app.
5. **Play Console:** complete developer identity verification and create the app under the intended account. Prepare contact email, privacy policy URL, account deletion webpage, content rating, Data safety answers, screenshots, store icon and feature graphic. Configure signing through Play App Signing and EAS. Use a narrowly scoped service account only if automated submissions are needed.
6. **Links:** choose an HTTPS domain you control. Host property landing pages, privacy/deletion pages and Android `/.well-known/assetlinks.json` using the Play signing certificate SHA-256 fingerprint.

Credential templates contain blanks intentionally. Passwords, recovery codes, service account JSON and server keys should not be pasted into chat or committed.

## Three product sections

### Architects

Search by service area, language, specialization and budget. Provide profiles, genuine portfolio uploads, contact/inquiry actions and saved profiles. Do not invent reviews, ratings, verification or availability. Retain existing architecture work where functional, and label or remove demo material before release.

### Properties

Authenticated owners create house, apartment, plot or farmhouse listings, upload photos and manage their own drafts. Browsing can be public. Capture price/currency, sale or rent, location, property/land classification, facing, dimensions, amenities and contact preferences. Publish through a moderation workflow. Include report/block functions, listing removal and account deletion. Keep exact private addresses/contact data out of public results unless the owner chooses to disclose them.

RLS must prevent users editing others' listings. Storage policies must enforce owner folders, file type/size limits and access rules. Public queries expose approved listings only. Render empty states when there are no listings; never silently substitute fake records after a failed request.

For NRI users, distinguish residential property from agricultural land, plantation property and legally classified farmhouses. Do not claim universal purchase eligibility. RBI guidance excludes the latter categories from the general purchase permission; transaction-specific eligibility requires professional assessment.

### Astrology / Vastu

Offer culturally grounded, optional guidance: a property-facing and layout checklist; educational explanations of Vastu traditions; and a future consultation/auspicious-date feature. Separate traditional beliefs from building safety, title verification and investment decisions. Do not fabricate horoscope scores, personalized predictions, scientific certainty or auspicious dates.

Confirmed launch languages: English (default), Tamil, Malayalam and Telugu. Account screens now include a persistent language selector with regional translations and English fallback. Other screens will be localized as they are implemented; regional copy requires native-speaker review before release. Date calculations require a selected tradition, local timezone/location and a verified panchang/ephemeris provider. Collect birth details only if a user explicitly requests a personalized service and consents to storage.

## Secure WhatsApp verification and recovery

Evolution delivers messages; it is not an identity authority. Supabase remains the account/session authority.

- Enrollment binds a normalized phone number to an authenticated or pending account only after successful OTP verification. Phone verification alone must never mark an unverified email address as verified.
- Store a cryptographic hash/HMAC of a random one-time code on the server with purpose, account/phone binding, short expiry, attempt count and consumption timestamp. Use atomic verification, resend cooldowns and rate limits by account/phone/IP; never return codes to the app or logs.
- Password recovery sends only to the account's previously verified phone. Never accept a replacement phone supplied in the recovery form as proof of account ownership.
- Use generic recovery responses to avoid account enumeration. After successful OTP verification issue a short-lived, single-use recovery authorization tied to that account; update the password server-side and invalidate recovery authorizations. Define and test session-revocation behavior.
- Keep all Evolution/admin credentials in Edge Function secrets. Test replay, expiry, brute force, delivery failure, unverified phone and concurrent verification attempts before enabling production recovery.
- Google-only users normally recover their Google account through Google. Do not silently turn phone possession into permission to take over an existing Google-linked identity.

## Sharing and UI

Use public HTTPS links such as `/property/<id>`. Installed Android apps open the listing through verified App Links; other users see a web preview and an install button. Opening the exact property after a fresh installation needs an explicitly implemented deferred-link flow (or asking users to reopen the original link); App Links alone do not preserve install context.

Visual direction: forest green, warm ivory, restrained gold, generous typography and an architectural/kolam-inspired mark. Use consistent buttons, accessible contrast, 48dp touch targets, clear validation and retry actions. Add subtle press/fade transitions honoring Reduce Motion. Avoid success notifications until server operations actually succeed.

## Release gates

- TypeScript, lint and production bundle pass; real Android device tests cover auth, OTP, photos, links, offline/retry and deletion.
- Database/storage policies and OTP abuse controls pass integration tests against the selected staging project.
- Google OAuth, WhatsApp delivery and recovery are verified end to end with owner-approved test accounts.
- No fake authentication, fabricated listing data, dead buttons or prototype-only flows remain in published navigation.
- Privacy, deletion, reporting/moderation and Data safety declarations reflect actual behavior.
- Final name/package/domain, signing, Play account and production build are ready.
- Applicable new personal Play developer accounts complete at least 12 opted-in testers for 14 consecutive days and obtain production access. Review/approval timing is controlled by Google.

No AAB or publication link has been produced yet. A Play listing URL cannot be presented as live until the listing exists and is available to its intended audience.

## Local implementation progress

The login/signup/account screens now use the Illamora palette and shared accessible controls with reduced-motion-aware press animations. Auth uses Supabase PKCE, persistent sessions, foreground refresh on native, and a single-use-code exchange shared between browser and callback handlers. The existing `tempapp` app scheme and Android package remain unchanged pending final identity selection. Allow `tempapp://auth/callback` in Supabase for a native development build; use the actual HTTPS `/auth/callback` origin for web. Expo Go callbacks differ: use a development build for realistic OAuth testing.

Public configuration is now installed locally. No remote user accounts or messages were created. Account creation currently uses email confirmation; requested WhatsApp enrollment/recovery is still outstanding. Public property browsing and sharing routes will be added outside the signed-in route group. Google sign-in cannot succeed until its provider is enabled in Supabase.

Supabase JS is pinned to 2.110.0 because the registry's latest 2.117.1 referenced an unavailable functions package during installation. The first dependency audit found vulnerabilities in the existing Expo/tooling dependency tree, including critical `shell-quote` and `tar` advisories. Dependency remediation and a fresh audit remain release gates.

Verified locally on 23 September 2026: TypeScript passes; lint on app/components/constants/hooks/lib/providers/tests and the preview script passes without warnings; all three auth-validation tests pass; Expo web export succeeds. Browser checks confirm signup navigation, password visibility toggling, disabled authentication when unconfigured, and a signed-out `/dashboard` request redirecting to `/login`. These checks do not prove live Supabase/Google authentication or Android behavior. The exported preview can be run with `npm run preview:web` after `npx expo export --platform web`.

Public browsing now opens on Properties, with Architects and Astrology / Vastu tabs. Directory queries read published Supabase records, have timeout/retry/empty states, and never substitute fabricated records. The selected project currently lacks the catalog tables, so a setup state is expected. The Vastu page includes a working preparation checklist and explicitly states that personalized auspicious dates are unavailable. Navigation/filters/headings support the selected languages; longer guidance still falls back to English pending translation review. The old prototype dashboard redirects to Properties, and the account screen no longer promotes prototype tools.

`supabase/migrations/202609230001_catalog.sql` creates property and architect tables with owner-only draft writes and public reads restricted to published records. Direct client changes to owner/status columns are denied; trusted moderation is required to publish. Local PGlite/PostgreSQL tests execute the migration and verify cross-owner denial, private drafts, permitted owner edits/deletes, denied self-publication and public reads after trusted publication for both tables. These are database tests with modeled Supabase auth roles, not hosted API/storage tests. All six current test cases pass; TypeScript, lint and web export pass. Browser checks verify all three tabs, the real missing-schema response, and the interactive Vastu checklist/date guidance.

The migration has NOT been applied remotely. Current CLI credentials cannot access the selected project, and the dashboard redirects to sign-in. A Supabase dashboard tab is open for the owner to sign in; no credentials were entered. Once authenticated, apply the tested migration to the selected project and recheck API permissions. The Supabase service-role key previously pasted in chat still needs owner rotation; it was never saved to the app.

Next implementation work: deploy and verify catalog schema, add property creation/photo upload/detail/sharing, architect enrollment/contact flows, finish localization, moderation/reporting/deletion, and implement server-backed WhatsApp verification/recovery. Personalized astrology still needs its calculation/provider integration. The legacy authenticated routes still contain prototype data and must be removed or completed before release.

## Splash, introduction and account flow

Illamora now has a native splash configuration, an animated branded loader, a welcome screen, and five swipeable introduction pages covering property discovery, architects, traditions/Vastu, listing and sharing. Completion is remembered locally; the tour can be replayed or skipped. Off-screen slides are hidden from accessibility navigation. Animations respect reduced-motion settings (GSAP on web, Animated on native). Login/signup use the same visual style and Outfit typography. The new courtyard illustration and logo concept are in `assets/branding/`.

Browser checks verified all five pages, completion persistence, replay, skip, account navigation and empty-form validation. TypeScript, lint and all six existing tests pass. Both web and Android JavaScript exports succeeded; this is not an AAB or a real-device validation of the native splash. The browser viewport override did not change the observed 796px viewport, so phone-size visual checks still need a real device or a working emulator. Some longer introduction text still falls back to English. Listing/sharing slides describe the intended product; these capabilities remain release gates below.

Evolution read-only instance discovery succeeded with the supplied server credential. `Rathnavel` and `Meenamma` reported connected; `test-tenant-1` reported closed. The owner must select the sender before delivery testing. The credential is stored only in ignored `.env.server.local`; no messages were sent. OTP signup/recovery endpoints, verified phone binding, expiry/attempt/rate controls and end-to-end delivery are not implemented yet.

## Sources

- Supabase Google OAuth: https://supabase.com/docs/guides/auth/social-login/auth-google
- Supabase native callbacks: https://supabase.com/docs/guides/auth/native-mobile-deep-linking
- Evolution send-text reference (verify against deployed version): https://doc.evolution-api.com/v2/api-reference/message-controller/send-text
- Google testing requirements: https://support.google.com/googleplay/android-developer/answer/14151465
- RBI immovable property FAQ: https://systemhealth.rbi.org.in/Scripts/FS_FAQs.aspx_Id%3D117%26fn%3D5.html
- IGNCA Vastu curriculum: https://ignca.gov.in/divisionss/academic-unit/short-term-certification-course/vastu-shastra/

## Original design restoration — 24 September 2026

The owner rejected the replacement visual direction. The original Git version of the BuildVerse dashboard, Home/Projects/Market/Profile tabs and login/signup layouts is now the visual authority. Preserve its blue-and-white palette, dark feature banner, tools grid and design gallery when adding features. Authentication still uses Supabase; the old demo-login bypass was not reinstated. The home screen can be previewed signed out; private routes remain guarded.

Home now links to Properties, Architects, Astrology/Vastu and a property upload form. The form supports details, photo selection/previews/removal and private draft persistence through Supabase. Migration 202609230002_property_photos.sql adds a private storage bucket with owner/draft policies. Both catalog and storage migrations still need deployment. No live property/photo upload has been verified, and publication/moderation remains unfinished. Existing original prototype tools are restored for design continuity and are not evidence of production backend functionality.

Impeccable was applied as a narrow refinement of the incumbent design. The mechanical detector found no issues in the dashboard and property form. Desktop/phone browser inspection and test results are recorded separately; native device coverage remains a release gate.

Restoration verification: TypeScript and lint pass; all seven auth/catalog/storage-policy tests pass. The web export succeeds. Browser checks at 1280px and 390px confirm the original home layout, restored bottom tabs, upload-form navigation, rent/price label switching and login validation. Final preview is open at `/dashboard`. Photo selection/removal code is present, but native picker and hosted upload still need device/staging verification. Onboarding/welcome and the account profile still need a subsequent consistency pass; this bounded pass focused on the restored home, account entry screens and property form.
