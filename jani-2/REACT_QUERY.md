# 🚀 React Query Implementation Guide

This document explains the React Query implementation in the JANI project for efficient data fetching and caching.

## 📋 Overview

We've implemented **TanStack React Query** (formerly React Query) to handle server state management, specifically for fetching pollution reports from Supabase. This provides automatic caching, background refetching, and improved performance.

## ✨ Benefits

### 1. **Automatic Caching**
- Reports are cached after the first fetch
- Subsequent visits to the Map page load instantly from cache
- No duplicate network requests

### 2. **Smart Refetching**
- Data automatically refetches when window regains focus
- Stale data is updated in the background
- User sees cached data immediately while fresh data loads

### 3. **Built-in State Management**
- Eliminates need for local `useState` for fetched data
- Provides `isLoading`, `error`, and `isFetching` states
- Cleaner component code

### 4. **Better UX**
- Loading states for initial fetch
- Background refetching indicator
- Error handling with user-friendly messages

## 📁 File Structure

```
src/
├── pages/
│   ├── supabase/
│   │   └── supabase.js       # Supabase helper functions
│   └── Map.jsx               # Map component using React Query
└── main.jsx                  # QueryClient setup
```

## 🔧 Implementation Details

### 1. Setup (main.jsx)

```javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
```

### 2. Helper Functions (supabase/supabase.js)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchReports = async () => {
    const { data, error } = await supabase
        .from("Jani")
        .select("*");

    if (error) throw new Error(error.message);
    return data;
};
```

### 3. Component Usage (Map.jsx)

**Before (with useState):**
```javascript
const Map = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const { data, error } = await supabase.from('Jani').select('*');
            if (error) {
                console.error('Error fetching reports:', error);
            } else {
                setReports(data);
            }
        };
        fetchReports();
    }, []);

    // Use reports...
}
```

**After (with React Query):**
```javascript
const Map = () => {
    const { data: reports = [], isLoading, error, isFetching } = useQuery({
        queryKey: ["reports"],
        queryFn: fetchReports,
    });

    if (isLoading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;

    // Use reports (always fresh or cached)...
}
```

## 🎯 Key Concepts

### Query Key
```javascript
queryKey: ["reports"]
```
- Unique identifier for this query
- Used for caching and refetching
- Can include parameters: `["reports", { userId: 1 }]`

### Query Function
```javascript
queryFn: fetchReports
```
- Function that returns a Promise
- Fetches data from API/database
- Should throw errors (not return them)

### Data Destructuring
```javascript
const { data: reports = [], isLoading, error, isFetching } = useQuery(...)
```
- `data` → Renamed to `reports` with default value `[]`
- `isLoading` → True during initial fetch
- `error` → Error object if fetch fails
- `isFetching` → True during any fetch (initial or background)

## 🔄 Refetching Behavior

React Query automatically refetches in these scenarios:

1. **Window Focus** - When user returns to the tab
2. **Network Reconnect** - When internet connection is restored
3. **Interval** - Can be configured for polling
4. **Manual** - Via `refetch()` function

### Default Configuration

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      cacheTime: 10 * 60 * 1000,       // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});
```

## 📊 State Management

### Loading States
- **`isLoading`** - Initial fetch, no cached data
- **`isFetching`** - Any fetch (including background)
- **`isRefetching`** - Background refetch with cached data

### Visual Indicators

```javascript
// Initial loading
if (isLoading) {
    return <LoadingSpinner />;
}

// Background refetching indicator
{isFetching && !isLoading && (
    <div className="refetching-badge">Refreshing...</div>
)}
```

## 🚀 Performance Benefits

### Memory Usage
- **Before**: Each component instance has its own state
- **After**: Shared cache across all components

### Network Requests
- **Before**: Fetch on every mount/unmount
- **After**: Fetch once, serve from cache

### User Experience
- **Before**: Blank screen during loading
- **After**: Show cached data immediately, update in background

## 🛠️ Advanced Features

### Manual Refetch
```javascript
const { data, refetch } = useQuery({...});

<button onClick={() => refetch()}>
    Refresh Reports
</button>
```

### Optimistic Updates
```javascript
const mutation = useMutation({
    mutationFn: createReport,
    onMutate: async (newReport) => {
        // Cancel refetch
        await queryClient.cancelQueries(['reports']);
        
        // Snapshot current value
        const previousReports = queryClient.getQueryData(['reports']);
        
        // Optimistically update
        queryClient.setQueryData(['reports'], old => [...old, newReport]);
        
        return { previousReports };
    },
    onError: (err, newReport, context) => {
        // Rollback on error
        queryClient.setQueryData(['reports'], context.previousReports);
    },
    onSettled: () => {
        // Refetch after mutation
        queryClient.invalidateQueries(['reports']);
    },
});
```

### Pagination
```javascript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['reports'],
    queryFn: ({ pageParam = 0 }) => fetchReports(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
```

## 🔍 DevTools

Install React Query DevTools for debugging:

```bash
npm install @tanstack/react-query-devtools
```

```javascript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## 📈 Next Steps

### Potential Improvements

1. **Add Mutations** - For creating/updating/deleting reports
2. **Implement Pagination** - For large datasets
3. **Add Search/Filter** - With query parameters
4. **Enable Polling** - For real-time updates
5. **Add Optimistic Updates** - For better UX

### Example: Add Mutation for Creating Reports

```javascript
// In supabase.js
export const createReport = async (reportData) => {
    const { data, error } = await supabase
        .from("Jani")
        .insert([reportData])
        .select();
    
    if (error) throw new Error(error.message);
    return data[0];
};

// In Report.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReport } from './supabase/supabase';

const Report = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: createReport,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['reports']);
        },
    });

    const handleSubmit = (reportData) => {
        mutation.mutate(reportData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <button disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
        </form>
    );
};
```

## 📚 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/guides/queries)
- [Supabase + React Query](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

## 🎓 Best Practices

1. ✅ **Use descriptive query keys**
2. ✅ **Keep query functions pure**
3. ✅ **Handle loading and error states**
4. ✅ **Throw errors in query functions**
5. ✅ **Use default values for data**
6. ✅ **Invalidate queries after mutations**
7. ✅ **Configure stale time appropriately**
8. ✅ **Use DevTools during development**

---

**Implemented by**: JANI Development Team  
**Date**: February 2026  
**Status**: ✅ Active in Production
