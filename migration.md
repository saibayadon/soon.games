# Next.js 15.4.2-canary.4 → 15.5.4 (Latest Stable) Migration Plan

## Current State Analysis

**Current Version:** `next@15.4.2-canary.4`  
**Target Version:** `next@15.5.4` (latest stable)  
**React Version:** `19.0.0` (stable)

### Features Currently Used
- ✅ `experimental.dynamicIO: true` - **This is the key feature**
- ✅ `"use cache"` directive in layouts and pages
- ✅ `unstable_cacheLife` from `next/cache`
- ✅ `"use server"` for Server Actions
- ✅ Async `cookies()` API (already migrated)
- ✅ Async `params` prop (already migrated)
- ✅ Turbopack in dev mode
- ✅ Standalone output mode for Docker

## Critical Findings: dynamicIO Status

### ⚠️ IMPORTANT: dynamicIO is NOT YET STABLE in Next.js 15.5.4

Based on research:
1. **`dynamicIO` is still experimental** in Next.js 15 stable
2. **`"use cache"` directive** - Still experimental, may have changes
3. **`unstable_cacheLife`** - The "unstable_" prefix indicates it's not stable yet
4. **Migration path:** The canary version you're using (15.4.2-canary.4) is testing features for Next.js 16

### What This Means
- The `dynamicIO` feature you're using is from Next.js 16 canary
- Moving to Next.js 15 stable might **break** your caching implementation
- You have two options:
  1. **Wait for Next.js 16 stable** (recommended if dynamicIO is critical)
  2. **Refactor to use Next.js 15 stable caching APIs** (removes dynamicIO features)

## Upgrade Path Options

### Option A: Upgrade to Next.js 16 Canary (Recommended)
**Best if:** You need dynamicIO features and can tolerate canary instability

```bash
npm install next@canary react@rc react-dom@rc
```

**Pros:**
- Keep current `"use cache"` and `cacheLife` implementation
- Access to latest dynamicIO features
- Minimal code changes required

**Cons:**
- Still in canary/experimental phase
- May have bugs or breaking changes
- Not recommended for production

---

### Option B: Downgrade to Next.js 15 Stable APIs (Stable Production Path)
**Best if:** You need production stability now

This requires **significant refactoring** of your caching strategy.

#### Changes Required:

1. **Remove `experimental.dynamicIO` from config**
2. **Replace `"use cache"` directive** with stable alternatives:
   - Use `fetch()` with `cache: 'force-cache'` for data
   - Use `unstable_cache()` from `next/cache` for other operations
   - Use route segment config: `export const revalidate = 3600`

3. **Replace `unstable_cacheLife`** with stable options:
   - `fetch(url, { next: { revalidate: 3600 } })` for fetch requests
   - Route segment config: `export const revalidate = 3600`
   - `unstable_cache(fn, keys, { revalidate: 3600 })` for non-fetch operations

#### Example Refactors:

**Before (with dynamicIO):**
```typescript
"use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";

export default async function ListPage(props: { params: Promise<{...}> }) {
  cacheLife("hours");
  const params = await props.params;
  const games = await fetchGamesIGDB(selectedConsole, selectedType);
  // ...
}
```

**After (Next.js 15 stable):**
```typescript
// Remove "use cache" directive

export const revalidate = 3600; // 1 hour

export default async function ListPage(props: { params: Promise<{...}> }) {
  const params = await props.params;
  const games = await fetchGamesIGDB(selectedConsole, selectedType);
  // ...
}
```

**Server Action Before:**
```typescript
"use server";
import { unstable_cacheLife as cacheLife } from "next/cache";

export const fetchGamesIGDB = async (c: Consoles, t: Types) => {
  "use cache";
  cacheLife("hours");
  // ... fetch logic
};
```

**Server Action After:**
```typescript
"use server";
import { unstable_cache } from "next/cache";

export const fetchGamesIGDB = unstable_cache(
  async (c: Consoles, t: Types) => {
    // ... fetch logic
  },
  ['games-igdb'], // cache key
  { revalidate: 3600, tags: ['games'] }
);
```

---

## Detailed Migration Steps

### For Option A (Next.js 16 Canary)

1. **Update Dependencies**
```bash
npm install next@canary react@rc react-dom@rc
npm install --save-dev @next/eslint-plugin-next@canary
```

2. **No Code Changes Required**
   - Your current implementation should work as-is
   - Monitor for canary breaking changes

3. **Test Thoroughly**
   - Test all routes: `/`, `/[console]/[type]/*`
   - Verify caching behavior in development
   - Test production build: `npm run build && npm start`

---

### For Option B (Next.js 15 Stable)

#### Step 1: Update Dependencies
```bash
npm install next@latest react@19.0.0 react-dom@19.0.0
npm install --save-dev @next/eslint-plugin-next@latest
```

#### Step 2: Update next.config.js
```diff
const config = {
-  experimental: {
-    dynamicIO: true,
-  },
  turbopack: {
    resolveAlias: {
      "~": "./src",
    },
  },
  output: "standalone",
  // ... rest of config
};
```

#### Step 3: Refactor src/app/[console]/[type]/page.tsx
```diff
- "use cache";
- import { unstable_cacheLife as cacheLife } from "next/cache";
  import Link from "next/link";
  import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";
  import { GameData, fetchGamesIGDB } from "./actions";

+ export const revalidate = 3600; // 1 hour cache

  export default async function ListPage(props: {
    params: Promise<{
      console: Consoles;
      type: Types;
    }>;
  }) {
-   cacheLife("hours");
    const params = await props.params;
    // ... rest of component
  }
```

#### Step 4: Refactor src/app/[console]/[type]/layout.tsx
```diff
- "use cache";
- import { unstable_cacheLife as cacheLife } from "next/cache";
  import { redirect } from "next/navigation";
  import Navigation from "./navigation";
  import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";

+ export const revalidate = 3600; // 1 hour cache

  export default async function ListLayout(props: {
    children: React.ReactNode;
    params: Promise<{
      console: Consoles;
      type: Types;
    }>;
  }) {
-   cacheLife("hours");
    const params = await props.params;
    // ... rest of component
  }
```

#### Step 5: Refactor src/app/[console]/[type]/actions.tsx
```diff
  "use server";
  
  import { cookies } from "next/headers";
- import { unstable_cacheLife as cacheLife } from "next/cache";
+ import { unstable_cache } from "next/cache";
  import { CONSOLES, CONSOLE_ID, Consoles, Types } from "~/data/constants";

  // ... types and other functions

- export const fetchGamesIGDB = async (
-   c: Consoles,
-   t: Types,
- ): Promise<GameData[]> => {
-   "use cache";
-   cacheLife("hours");
-
-   try {
-     // ... fetch logic
-   } catch (e) {
-     return [];
-   }
- };

+ export const fetchGamesIGDB = unstable_cache(
+   async (c: Consoles, t: Types): Promise<GameData[]> => {
+     try {
+       const token = await fetchIGDBToken();
+       const GAMES_URL = `https://api.igdb.com/v4/games`;
+       const headers = {
+         "Client-ID": process.env.IGDB_CLIENT || "",
+         Authorization: `Bearer ${token}`,
+       };
+       const games = await fetch(GAMES_URL, {
+         body: generateQuery(c, t),
+         headers,
+         method: "POST",
+       }).then((res) => res.json());
+       if (games.length >= 0) return games;
+       return [];
+     } catch (e) {
+       return [];
+     }
+   },
+   ['games-igdb'], // cache key
+   { 
+     revalidate: 3600, // 1 hour
+     tags: ['igdb-games'] // for on-demand revalidation
+   }
+ );
```

#### Step 6: Test Build and Runtime
```bash
# Test development mode
npm run dev

# Test production build
npm run build
npm start

# Verify routes work:
# - http://localhost:3000
# - http://localhost:3000/switch-2/new
# - http://localhost:3000/switch-2/coming_soon
```

---

## Breaking Changes to Be Aware Of (Next.js 15)

### Already Handled in Your Code ✅
- ✅ Async `params` prop - Your code already uses `await props.params`
- ✅ Async `cookies()` - Your code already uses `await cookies()`

### Not Applicable to Your Project
- ❌ `headers()` - Not used in your codebase
- ❌ `searchParams` - Not used in your codebase
- ❌ `draftMode()` - Not used

### Caching Changes (Important!)
In Next.js 15:
- **`GET` Route Handlers** are no longer cached by default
- **Client Router Cache** no longer caches page components by default
- **Fetch requests** are not cached by default (need explicit `cache: 'force-cache'`)

**Impact on your app:**
- Your `/revalidate/route.ts` will not be cached (good - you probably want fresh data)
- If you move to Option B, you'll need to explicitly cache data with `unstable_cache()`

---

## Testing Checklist

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Console navigation works (switch between consoles)
- [ ] Type navigation works (new vs coming_soon)
- [ ] Game data displays correctly
- [ ] Video links work
- [ ] Images load on hover
- [ ] Cookies are set correctly for selections

### Performance Tests
- [ ] Verify caching is working (check response times)
- [ ] Check Network tab - subsequent visits should be cached
- [ ] Test cache revalidation after 1 hour
- [ ] Build size is reasonable (`npm run build`)

### Docker/Production Tests
- [ ] Docker build succeeds
- [ ] Container runs correctly
- [ ] Standalone output works
- [ ] Environment variables work

---

## Recommendation

### 🎯 Recommended: Option A (Next.js 16 Canary)

**Rationale:**
1. Your code is already written for dynamicIO features
2. Minimal changes required
3. You're already on a canary version (15.4.2-canary.4)
4. Moving to 16.0.0-canary gives you the latest dynamicIO improvements
5. When Next.js 16 goes stable, you'll have less migration work

**Timeline:**
- **Now:** Upgrade to `next@canary` (16.0.0-canary.2)
- **When Next.js 16 is stable:** Update to `next@latest` (minimal changes)

### ⚠️ Alternative: Option B (Next.js 15 Stable)

Only choose this if:
- You need production stability immediately
- You can invest time in refactoring (3-4 hours estimated)
- You're okay with more migration work when Next.js 16 is released

---

## Quick Command Reference

### Option A Commands
```bash
# Upgrade to Next.js 16 canary
npm install next@canary react@rc react-dom@rc
npm install --save-dev @next/eslint-plugin-next@canary

# Test
npm run build
npm start
```

### Option B Commands  
```bash
# Upgrade to Next.js 15 stable
npm install next@latest react@19.0.0 react-dom@19.0.0
npm install --save-dev @next/eslint-plugin-next@latest

# Apply codemods (after manual refactoring)
npx @next/codemod@canary upgrade latest

# Test
npm run build
npm start
```

---

## Resources

- [Next.js 15 Release Blog](https://nextjs.org/blog/next-15)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

---

## Notes

- The `dynamicIO` feature and `"use cache"` directive are **next-generation caching APIs**
- They represent the future of Next.js caching but are not yet stable
- Your current implementation is forward-looking and well-structured
- Consider staying on canary until Next.js 16 stable if dynamicIO is critical to your architecture
