export enum DiagnosticSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  FATAL = 'fatal',
}

export enum DiagnosticCategory {
  LOADER = 'loader',
  PARSER = 'parser',
  SCHEMA = 'schema',
  SEMANTIC = 'semantic',
  NORMALIZER = 'normalizer',
  RESOLVER = 'resolver',
  RUNTIME = 'runtime',
  PLUGIN = 'plugin',
  INTERNAL = 'internal',
}

export enum LoaderDiagnosticCode {
  // loader
  LOADER_UNDEFINED_INPUT = 'LOADER_UNDEFINED_INPUT',
  LOADER_FETCH_FAILURE = 'LOADER_FETCH_FAILURE',
}
export enum ParserDiagnosticCode {
  // parser
  PARSER_UNDEFINED_SOURCE = 'PARSER_UNDEFINED_SOURCE',
  PARSER_INVALID_SYNTAX = 'PARSER_INVALID_SYNTAX',
}
export enum SchemaDiagnosticCode {
  // schema
  SCHEMA_INVALID_DOCUMENT = 'SCHEMA_INVALID_DOCUMENT',
  SCHEMA_UNDEFINED_DOCUMENT = 'SCHEMA_UNDEFINED_DOCUMENT',
}
export enum NormalizerDiagnosticCode {
  // normalizer
  NORMALIZER_UNDEFINED_DOCUMENT = 'NORMALIZER_UNDEFINED_DOCUMENT',
  NORMALIZER_FAILURE = 'NORMALIZER_FAILURE',
}
export enum SemanticDiagnosticCode {
  // semantic
  SEMANTIC_UNDEFINED_DOCUMENT = 'SEMANTIC_UNDEFINED_DOCUMENT',
  SEMANTIC_INVALID_DOCUMENT_VERSION = 'SEMANTIC_INVALID_DOCUMENT_VERSION',
  SEMANTIC_MISSING_RECIPES = 'SEMANTIC_MISSING_RECIPES',
  SEMANTIC_MISSING_INFORMATION_TITLE = 'SEMANTIC_MISSING_INFORMATION_TITLE',
  SEMANTIC_INVALID_ENUM = 'SEMANTIC_INVALID_ENUM',
  SEMANTIC_INVALID_ID = 'SEMANTIC_INVALID_ID',
  SEMANTIC_INVALID_DURATION = 'SEMANTIC_INVALID_DURATION',
  SEMANTIC_INVALID_QUANTITY = 'SEMANTIC_INVALID_QUANTITY',
  SEMANTIC_EMPTY_TEXT = 'SEMANTIC_EMPTY_TEXT',
  SEMANTIC_REFERENCE_INVALID_FORMAT = 'REFERENCE_INVALID_FORMAT',
  SEMANTIC_REFERENCE_NOT_FOUND = 'REFERENCE_NOT_FOUND',
  SEMANTIC_REFERENCE_CYCLIC = 'REFERENCE_CYCLIC',
  SEMANTIC_FAILURE = 'SEMANTIC_FAILURE',
}
export enum ResolverDiagnosticCode {
  // resolver
  RESOLVER_UNDEFINED_DOCUMENT = 'RESOLVER_UNDEFINED_DOCUMENT',
  RESOLVER_FAILURE = 'RESOLVER_FAILURE',
}
export enum RuntimeDiagnosticCode {
  // runtime
  RUNTIME_UNDEFINED_DOCUMENT = 'RUNTIME_UNDEFINED_DOCUMENT',
  RUNTIME_BUILD_FAILURE = 'RUNTIME_BUILD_FAILURE',
}
export enum InternalDiagnosticCode {
  // process
  INTERNAL_PROCESS_FAILURE = 'PROCESS_FAILURE',
  INTERNAL_PROCESS_ABORTED = 'INTERNAL_PROCESS_ABORTED',
}
export type DiagnosticCodeMap = {
  [DiagnosticCategory.LOADER]: LoaderDiagnosticCode
  [DiagnosticCategory.PARSER]: ParserDiagnosticCode
  [DiagnosticCategory.SCHEMA]: SchemaDiagnosticCode
  [DiagnosticCategory.NORMALIZER]: NormalizerDiagnosticCode
  [DiagnosticCategory.SEMANTIC]: SemanticDiagnosticCode
  [DiagnosticCategory.RESOLVER]: ResolverDiagnosticCode
  [DiagnosticCategory.RUNTIME]: RuntimeDiagnosticCode
  [DiagnosticCategory.PLUGIN]: InternalDiagnosticCode
  [DiagnosticCategory.INTERNAL]: InternalDiagnosticCode
}
