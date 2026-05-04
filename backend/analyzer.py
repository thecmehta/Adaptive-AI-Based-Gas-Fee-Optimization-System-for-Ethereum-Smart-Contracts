def analyze_contract(code):
    issues = []

    if "for (" in code:
        issues.append("⚠️ Loop detected → High gas usage")

    if "storage" in code:
        issues.append("⚠️ Storage usage → Expensive operation")

    if "push(" in code:
        issues.append("⚠️ Dynamic array push → costly")

    if "uint256[]" in code:
        issues.append("⚠️ Large storage arrays increase gas")

    if "mapping" not in code:
        issues.append("💡 Consider using mapping instead of arrays")

    if len(issues) == 0:
        issues.append("✅ Contract looks optimized")

    return issues