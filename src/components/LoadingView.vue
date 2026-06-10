<script setup lang="ts">
import { useLoading } from '@/composables/useLoading.ts'
import { useOpenCookingManager } from '@/composables/useOpenCookingManager';
import { DiagnosticSeverity } from '@/open-cooking-core/diagnostics';
import type { ZodError } from 'zod';
const { loaderView } = useLoading();
const { manager } = useOpenCookingManager()

function formatZodError(zodError: ZodError) {
  return zodError.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message || '',
    code: issue.code || ''
  }))
}
</script>

<template>
  <div class="h-full grid grid-rows-[1fr_auto]">
    <div class="flex items-center justify-center">
      <component :is="loaderView" />
    </div>
    <!-- {{ manager.loadedSpec.value?.diagnostics.get() }} -->

    <div class="px-4 pb-4 pt-4">
      <div class="mx-auto max-w-2xl space-y-3">

        <div class="card rounded" :class="{
          'card-warning': manager.loadedSpec.value?.diagnostics?.hasWarning(),
          'card-error': manager.loadedSpec.value?.diagnostics?.hasError(),
          'card-fatal': manager.loadedSpec.value?.diagnostics?.hasFatal(),
        }">
          <div v-for="diagnostic in manager.loadedSpec.value?.diagnostics.get()" class="p-4">
            <p :class="{
              'text-warning': diagnostic.severity === DiagnosticSeverity.WARNING,
              'text-error': diagnostic.severity === DiagnosticSeverity.ERROR,
              'text-fatal': diagnostic.severity === DiagnosticSeverity.FATAL,
            }">{{ diagnostic.code }}</p>
            <p class="pt-4">{{ diagnostic.message }}</p>
            <div v-if="diagnostic.extra" class="bg-surface-elevated text-default p-4 rounded-xl">
              <h4 class="text-subtle pb-2">Details</h4>

              <div v-for="error in formatZodError(diagnostic.extra as ZodError)"
                :key="`${error.path}-${error.message}`">
                <div class="font-medium" :class="{
                  'text-warning': diagnostic.severity === DiagnosticSeverity.WARNING,
                  'text-error': diagnostic.severity === DiagnosticSeverity.ERROR,
                  'text-fatal': diagnostic.severity === DiagnosticSeverity.FATAL,
                }">
                  {{ error.path || 'Specification' }}
                </div>
                <div class="mt-1 text-sm text-muted">
                  {{ error.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
