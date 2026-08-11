/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces server-side role validation across PASSENGER, DRIVER, ADMIN, and SOC roles.
 */
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication required prior to role authorization.',
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_ROLE_ACCESS',
          message: `Access denied. Role '${req.user.role}' is not authorized to perform this transit operation. Required role(s): [${allowedRoles.join(', ')}].`,
        },
      });
    }

    next();
  };
}

export default authorizeRoles;
