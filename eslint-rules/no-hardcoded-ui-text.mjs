const textProps = new Set([
  "alt",
  "aria-label",
  "aria-description",
  "aria-roledescription",
  "title",
  "placeholder",
  "label",
  "description",
  "content",
])

function hasText(value) {
  return typeof value === "string" && /[\p{L}\p{N}]/u.test(value)
}

function hasLiteralText(node) {
  if (!node) return false
  if (node.type === "Literal") return hasText(node.value)
  if (node.type === "TemplateLiteral") {
    return node.quasis.some((part) => hasText(part.value.cooked))
  }
  if (node.type === "ConditionalExpression") {
    return hasLiteralText(node.consequent) || hasLiteralText(node.alternate)
  }
  if (node.type === "LogicalExpression") return hasLiteralText(node.right)
  if (node.type === "BinaryExpression" && node.operator === "+") {
    return hasLiteralText(node.left) || hasLiteralText(node.right)
  }
  return false
}

const noHardcodedUiText = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      localize:
        "Move user-facing text to i18n/it.ts and reference its message key.",
    },
  },
  create(context) {
    const report = (node) => context.report({ node, messageId: "localize" })
    return {
      JSXText(node) {
        if (hasText(node.value)) report(node)
      },
      JSXAttribute(node) {
        if (textProps.has(node.name.name) && hasLiteralText(node.value))
          report(node)
      },
      JSXExpressionContainer(node) {
        const parent = node.parent
        if (
          (parent.type === "JSXElement" ||
            parent.type === "JSXFragment" ||
            (parent.type === "JSXAttribute" &&
              textProps.has(parent.name.name))) &&
          hasLiteralText(node.expression)
        )
          report(node)
      },
      Property(node) {
        const key = node.key.name ?? node.key.value
        if (!node.computed && textProps.has(key) && hasLiteralText(node.value))
          report(node)
      },
    }
  },
}

export default noHardcodedUiText
