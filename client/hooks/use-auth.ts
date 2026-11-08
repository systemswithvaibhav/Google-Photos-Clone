"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { authKeys } from "@/lib/validations/query-keys";
import type { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";
import { useAuthStore } from "@/stores/auth-store";

export function useCurrentUser() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const cachedUser = useAuthStore((state) => state.user);
  
    return useQuery({
      queryKey: authKeys.me(),
      queryFn: () => api.me(),
      enabled: !!accessToken,
      initialData: cachedUser ?? undefined,
      staleTime: 5 * 60 * 1000,
    });
  }