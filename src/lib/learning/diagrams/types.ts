/**
 * Diagram System - Type Definitions
 *
 * Types for interactive educational diagrams and visualizations.
 */

import { ReactNode } from 'react'

// ============================================================================
// DIAGRAM TYPES
// ============================================================================

/**
 * Type of diagram
 */
export type DiagramType =
  | 'box-model'         // CSS Box Model visualization
  | 'flexbox'           // Flexbox layout visualization
  | 'grid'              // CSS Grid visualization
  | 'dom-tree'          // DOM Tree structure
  | 'event-loop'        // JavaScript Event Loop animation
  | 'scope-chain'       // JavaScript Scope Chain
  | 'component-tree'    // React Component Tree
  | 'custom'            // Custom diagram

/**
 * Type of diagram component
 */
export type DiagramComponentType = 'box' | 'arrow' | 'text' | 'animation' | 'interactive' | 'group'

/**
 * Type of control for interactive diagrams
 */
export type DiagramControlType = 'slider' | 'toggle' | 'dropdown' | 'button' | 'input'

/**
 * A complete diagram with components and controls
 */
export interface Diagram {
  id: string                              // Unique ID: 'box-model-diagram'
  title: string                           // Diagram title
  description?: string                    // Optional description
  type: DiagramType                       // Diagram type
  interactive: boolean                    // Whether diagram is interactive
  components: DiagramComponent[]          // Visual components
  controls?: DiagramControl[]             // Interactive controls
  initialState?: Record<string, unknown>  // Initial state values
  width?: number | string                 // Diagram width
  height?: number | string                // Diagram height
  responsive?: boolean                    // Whether diagram is responsive
}

/**
 * A visual component within a diagram
 */
export interface DiagramComponent {
  id: string                              // Unique ID within diagram
  type: DiagramComponentType              // Component type
  props: Record<string, unknown>          // Component properties (flexible)
  children?: DiagramComponent[]           // Nested components
  style?: React.CSSProperties             // Optional inline styles
  className?: string                      // Optional CSS classes
  render?: (state: DiagramState) => ReactNode  // Custom render function
}

/**
 * An interactive control for a diagram
 */
export interface DiagramControl {
  id: string                              // Unique ID: 'padding-slider'
  type: DiagramControlType                // Control type
  label: string                           // Control label
  value: unknown                          // Current value
  onChange: (value: unknown) => void      // Change handler
  min?: number                            // Min value (for slider/input)
  max?: number                            // Max value (for slider/input)
  step?: number                           // Step value (for slider)
  options?: DiagramControlOption[]        // Options (for dropdown)
  disabled?: boolean                      // Whether control is disabled
  tooltip?: string                        // Optional tooltip
}

/**
 * Option for dropdown control
 */
export interface DiagramControlOption {
  label: string                           // Display label
  value: unknown                          // Option value
  description?: string                    // Optional description
}

/**
 * Diagram state (for interactive diagrams)
 */
export interface DiagramState {
  values: Record<string, unknown>         // Current values
  history?: DiagramState[]                // State history (for undo/redo)
  animating?: boolean                     // Whether animation is running
  paused?: boolean                        // Whether animation is paused
}

// ============================================================================
// SPECIFIC DIAGRAM TYPES
// ============================================================================

/**
 * Box Model diagram state
 */
export interface BoxModelState {
  content: number                         // Content size (px)
  padding: number                         // Padding size (px)
  border: number                          // Border size (px)
  margin: number                          // Margin size (px)
  backgroundColor?: string                // Content background color
  borderColor?: string                    // Border color
}

/**
 * Flexbox diagram state
 */
export interface FlexboxState {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number                            // Gap between items (px)
  items: FlexItem[]                       // Flex items
}

/**
 * Flex item properties
 */
export interface FlexItem {
  id: string                              // Item ID
  flexGrow: number                        // flex-grow value
  flexShrink: number                      // flex-shrink value
  flexBasis: string                       // flex-basis value
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  content?: string                        // Item content
}

/**
 * Grid diagram state
 */
export interface GridState {
  gridTemplateColumns: string             // Grid columns definition
  gridTemplateRows: string                // Grid rows definition
  gap?: number                            // Gap between cells (px)
  gridTemplateAreas?: string              // Named grid areas
  items: GridItem[]                       // Grid items
}

/**
 * Grid item properties
 */
export interface GridItem {
  id: string                              // Item ID
  gridArea?: string                       // Named area
  gridColumn?: string                     // Column placement
  gridRow?: string                        // Row placement
  content?: string                        // Item content
}

/**
 * DOM Tree node
 */
export interface DOMTreeNode {
  id: string                              // Node ID
  type: 'element' | 'text' | 'comment'    // Node type
  tagName?: string                        // Tag name (for elements)
  attributes?: Record<string, string>     // Element attributes
  textContent?: string                    // Text content
  children?: DOMTreeNode[]                // Child nodes
  collapsed?: boolean                     // Whether node is collapsed
}

/**
 * Event Loop diagram state
 */
export interface EventLoopState {
  callStack: string[]                     // Call stack items
  taskQueue: string[]                     // Task queue items
  microtaskQueue: string[]                // Microtask queue items
  webAPIs: string[]                       // Web API calls
  currentExecution?: string               // Currently executing code
  paused: boolean                         // Animation paused
  speed: number                           // Animation speed (1-10)
}
