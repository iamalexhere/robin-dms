// Role-based utility functions for filtering data and checking access

export type UserRole = 'dms_admin' | 'dms_business_user' | 'dealer_admin' | 'dealer_normal_user';

interface RoleBasedItem {
    roles: UserRole[];
    [key: string]: any;
}

/**
 * Filter data items by user role
 * @param items - Array of items with roles property
 * @param userRole - Current user's role
 * @returns Filtered array containing only items accessible to the user role
 */
export function filterByRole<T extends RoleBasedItem>(items: T[], userRole: UserRole): T[] {
    return items.filter(item => item.roles.includes(userRole));
}

/**
 * Check if a user role has access to a specific widget
 * @param widgetName - Name of the widget to check
 * @param userRole - Current user's role
 * @returns Boolean indicating if the role has access
 */
export function hasWidgetAccess(widgetName: string, userRole: UserRole): boolean {
    const widgetAccessMap: Record<string, UserRole[]> = {
        'kpi': ['dms_admin', 'dms_business_user', 'dealer_admin'],
        'mis': ['dms_admin', 'dms_business_user', 'dealer_admin'],
        // All other widgets are accessible to all roles
    };

    const allowedRoles = widgetAccessMap[widgetName];

    // If widget not in map, it's accessible to all
    if (!allowedRoles) {
        return true;
    }

    return allowedRoles.includes(userRole);
}

/**
 * Determine if a widget should be displayed based on role and data availability
 * @param widgetName - Name of the widget
 * @param userRole - Current user's role
 * @param hasData - Whether the widget has data to display
 * @returns Boolean indicating if widget should be shown
 */
export function shouldShowWidget(
    widgetName: string,
    userRole: UserRole,
    hasData: boolean
): boolean {
    // Don't show if no data
    if (!hasData) {
        return false;
    }

    // Check role-based access
    return hasWidgetAccess(widgetName, userRole);
}

/**
 * Check if user role has access based on hasAccess object
 * @param hasAccessObj - Object with role keys and boolean values
 * @param userRole - Current user's role
 * @returns Boolean indicating if role has access
 */
export function checkRoleAccess(
    hasAccessObj: Record<string, boolean>,
    userRole: UserRole
): boolean {
    return hasAccessObj[userRole] === true;
}
