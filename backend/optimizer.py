import re

def optimize_contract(code):
    suggestions = []
    optimized = code

    # -----------------------------
    # RULE 1: Dynamic array detection
    # -----------------------------
    array_pattern = r"uint256\[\]\s+public\s+(\w+);"
    arrays = re.findall(array_pattern, code)

    for var in arrays:
        suggestions.append(
            f"⚠️ Array '{var}' uses storage → expensive. Consider mapping + counter pattern."
        )

    # -----------------------------
    # RULE 2: push() detection
    # -----------------------------
    if ".push(" in code:
        suggestions.append(
            "⚠️ push() detected → costly storage writes. Prefer mapping + index pattern."
        )

    # -----------------------------
    # RULE 3: LOOP detection
    # -----------------------------
    if re.search(r"for\s*\(", code):
        suggestions.append(
            "⚠️ Loop detected → high gas usage. Consider batching or limiting iterations."
        )

    # -----------------------------
    # RULE 4: SAFE increment optimization
    # -----------------------------
    if "i++" in optimized:
        optimized = re.sub(r"\bi\+\+", "++i", optimized)
        suggestions.append("✔ Replaced i++ with ++i → minor gas optimization")

    # -----------------------------
    # RULE 5: storage keyword
    # -----------------------------
    if "storage" in code:
        suggestions.append(
            "⚠️ storage keyword used → expensive. Use memory where possible."
        )

    # -----------------------------
    # RULE 6: constant suggestion (SAFE ONLY)
    # -----------------------------
    const_pattern = r"uint256\s+(\w+)\s*=\s*(\d+);"
    consts = re.findall(const_pattern, code)

    for var, val in consts:
        suggestions.append(
            f"💡 '{var}' might be constant → use 'constant' keyword to save gas."
        )

    # -----------------------------
    # RULE 7: function visibility (SAFE hint only)
    # -----------------------------
    func_pattern = r"function\s+\w+\(.*?\)\s+public"
    if re.search(func_pattern, code):
        suggestions.append(
            "💡 Use 'external' instead of 'public' for functions when possible."
        )

    # -----------------------------
    # RULE 8: length usage
    # -----------------------------
    if ".length" in code:
        suggestions.append(
            "💡 Cache array length in a local variable inside loops."
        )

    # -----------------------------
    # RULE 9: unchecked arithmetic
    # -----------------------------
    if "+" in code and "unchecked" not in code:
        suggestions.append(
            "💡 Use 'unchecked { }' in loops to reduce gas for arithmetic."
        )

    # -----------------------------
    # RULE 10: require optimization
    # -----------------------------
    if "require(" in code:
        suggestions.append(
            "💡 Keep require conditions minimal to reduce gas."
        )

    # -----------------------------
    # 🔥 RULE 11: SMART AUTO REWRITE (SAFE CASE ONLY)
    # -----------------------------
    # Only apply if BOTH array + push exist
    if arrays and ".push(" in code:
        var = arrays[0]  # first array only (safe)

        # add counter variable
        optimized = re.sub(
            rf"uint256\[\]\s+public\s+{var};",
            f"mapping(uint256 => uint256) public {var};\n    uint256 public {var}Count;",
            optimized
        )

        # replace push safely
        optimized = re.sub(
            rf"{var}\.push\((.*?)\);",
            f"{var}[{var}Count] = \\1;\n        {var}Count++;",
            optimized
        )

        suggestions.append(
            "⚡ Auto-optimized: Replaced array + push with mapping + counter pattern"
        )

    # -----------------------------
    # FINAL
    # -----------------------------
    if len(suggestions) == 0:
        suggestions.append("✅ Contract appears reasonably optimized")

    return optimized, list(set(suggestions))